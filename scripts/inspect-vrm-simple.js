import { readFileSync } from 'fs';

const vrmPath = process.argv[2] || './Mafuyu_VRM.vrm';

console.log(`🔍 Inspecting VRM file: ${vrmPath}\n`);

try {
  const buffer = readFileSync(vrmPath);

  const dataView = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  const magic = dataView.getUint32(0, true);
  if (magic !== 0x46546C67) {
    console.error('❌ Not a valid glTF/VRM file');
    process.exit(1);
  }

  console.log('✅ Valid glTF binary format\n');

  const jsonChunkLength = dataView.getUint32(12, true);
  const jsonChunkStart = 20;

  const jsonString = buffer.toString('utf8', jsonChunkStart, jsonChunkStart + jsonChunkLength);
  const gltf = JSON.parse(jsonString);

  console.log('📦 VRM Information');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const vrmExtension = gltf.extensions?.VRM || gltf.extensions?.VRMC_vrm;

  if (vrmExtension) {
    const meta = vrmExtension.meta || vrmExtension;
    console.log('📋 VRM Version:', gltf.extensions.VRMC_vrm ? '1.0' : '0.x');
    console.log('👤 Model Name:', meta.name || meta.title || 'Unnamed');
    console.log('✍️  Author:', meta.author || meta.authors?.[0] || 'Unknown');
    console.log('');
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

  console.log('😊 AVAILABLE EXPRESSIONS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total expressions: ${expressions.length}\n`);

  if (expressions.length > 0) {
    expressions.forEach((exp, index) => {
      console.log(`${index + 1}. "${exp.name}"`);
      console.log(`   - Type: ${exp.type}`);
      if (exp.isBinary !== undefined) {
        console.log(`   - Control: ${exp.isBinary ? 'Binary (On/Off)' : 'Analog (0-1)'}`);
      }
      if (exp.overrides) {
        const overrideList = Object.entries(exp.overrides)
          .filter(([_, v]) => v)
          .map(([k]) => k);
        if (overrideList.length > 0) {
          console.log(`   - Overrides: ${overrideList.join(', ')}`);
        }
      }
      console.log('');
    });

    console.log('\n💡 SUGGESTED HOTKEY MAPPING');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const presetExpressions = expressions.filter(exp =>
      ['happy', 'angry', 'sad', 'relaxed', 'surprised', 'neutral'].some(preset =>
        exp.name.toLowerCase().includes(preset)
      )
    );

    const mouthExpressions = expressions.filter(exp =>
      ['aa', 'ih', 'ou', 'ee', 'oh', 'a', 'i', 'u', 'e', 'o'].some(mouth =>
        exp.name.toLowerCase() === mouth
      )
    );

    const customExpressions = expressions.filter(exp =>
      !presetExpressions.includes(exp) &&
      !mouthExpressions.includes(exp) &&
      !exp.name.toLowerCase().includes('blink')
    );

    console.log('\n📌 Preset Expressions (Recommended for hotkeys 1-9):');
    if (presetExpressions.length > 0) {
      presetExpressions.forEach((exp, i) => {
        if (i < 9) {
          console.log(`   Key ${i + 1}: ${exp.name}`);
        }
      });
    } else {
      console.log('   (None found)');
    }

    console.log('\n🎨 Custom Expressions:');
    if (customExpressions.length > 0) {
      customExpressions.forEach((exp, i) => {
        const keyIndex = presetExpressions.length + i + 1;
        if (keyIndex <= 9) {
          console.log(`   Key ${keyIndex}: ${exp.name}`);
        } else if (i < 5) {
          console.log(`   (no key): ${exp.name}`);
        }
      });
      if (customExpressions.length > 9 - presetExpressions.length) {
        console.log(`   ... and ${customExpressions.length - (9 - presetExpressions.length)} more`);
      }
    } else {
      console.log('   (None found)');
    }

    console.log('\n🗣️  Mouth Shapes (Auto-controlled by voice):');
    if (mouthExpressions.length > 0) {
      console.log(`   ${mouthExpressions.map(exp => exp.name).join(', ')}`);
    } else {
      console.log('   (None found)');
    }

    console.log('\n✅ Expression hotkey feature is POSSIBLE!');
    console.log(`   Suggested: Use keys 1-${Math.min(presetExpressions.length + customExpressions.length, 9)} for expressions`);

  } else {
    console.log('❌ No expressions found in this VRM model');
    console.log('   Expression hotkey feature cannot be implemented\n');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Inspection complete\n');

} catch (error) {
  console.error('❌ Error reading file:', error.message);
  console.error(error.stack);
}
