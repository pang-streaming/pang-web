import { readFileSync } from 'fs';

const vrmPath = process.argv[2] || './Mafuyu_VRM.vrm';

console.log(`Inspecting: ${vrmPath}\n`);

try {
  const buffer = readFileSync(vrmPath);

  const dataView = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  const magic = dataView.getUint32(0, true);
  if (magic !== 0x46546C67) {
    console.error('Error: Not a valid glTF/VRM file');
    process.exit(1);
  }


  const jsonChunkLength = dataView.getUint32(12, true);
  const jsonChunkStart = 20;

  const jsonString = buffer.toString('utf8', jsonChunkStart, jsonChunkStart + jsonChunkLength);
  const gltf = JSON.parse(jsonString);

  const vrmExtension = gltf.extensions?.VRM || gltf.extensions?.VRMC_vrm;
  if (vrmExtension) {
    const meta = vrmExtension.meta || vrmExtension;
    console.log(`Model: ${meta.name || meta.title || 'Unnamed'}`);
    console.log(`Version: ${gltf.extensions.VRMC_vrm ? '1.0' : '0.x'}\n`);
  }

  let expressions = [];

  if (gltf.extensions?.VRMC_vrm?.expressions) {
    const expData = gltf.extensions.VRMC_vrm.expressions;

    if (expData.preset) {
      expressions.push(...Object.entries(expData.preset).map(([name, data]) => ({
        name,
        type: 'preset',
        isBinary: data.isBinary,
        overrides: {
          blink: data.overrideBlink,
          lookAt: data.overrideLookAt,
          mouth: data.overrideMouth
        }
      })));
    }

    if (expData.custom) {
      expressions.push(...Object.entries(expData.custom).map(([name, data]) => ({
        name,
        type: 'custom',
        isBinary: data.isBinary,
        overrides: {
          blink: data.overrideBlink,
          lookAt: data.overrideLookAt,
          mouth: data.overrideMouth
        }
      })));
    }
  } else if (gltf.extensions?.VRM?.blendShapeMaster?.blendShapeGroups) {
    expressions = gltf.extensions.VRM.blendShapeMaster.blendShapeGroups.map(group => ({
      name: group.name || group.presetName,
      type: group.presetName ? 'preset' : 'custom',
      isBinary: group.isBinary
    }));
  }

  console.log(`Found ${expressions.length} expressions\n`);

  if (expressions.length > 0) {
    expressions.forEach((exp, index) => {
      console.log(`${index + 1}. ${exp.name}`);
    });
  } else {
    console.log('No expressions found');
  }

} catch (error) {
  console.error('Error:', error.message);
}
