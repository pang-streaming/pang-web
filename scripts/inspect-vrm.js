import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { readFileSync } from 'fs';

const vrmPath = process.argv[2] || './Mafuyu_VRM.vrm';

console.log(`Inspecting: ${vrmPath}\n`);

const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

try {
  const buffer = readFileSync(vrmPath);
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  loader.parse(arrayBuffer, '', (gltf) => {
    const vrm = gltf.userData.vrm;

    console.log(`Model: ${vrm.meta?.name || 'Unnamed'}`);
    console.log(`Version: ${vrm.meta?.metaVersion || 'Unknown'}\n`);

    if (vrm.expressionManager) {
      const expressions = vrm.expressionManager.expressions;
      const expressionNames = Object.keys(expressions);

      console.log(`Found ${expressionNames.length} expressions\n`);

      if (expressionNames.length > 0) {
        expressionNames.forEach((name, index) => {
          console.log(`${index + 1}. ${name}`);
        });
      } else {
        console.log('No expressions found');
      }
    } else {
      console.log('No expression manager found');
    }

  }, (error) => {
    console.error('Error parsing VRM:', error);
  });
} catch (error) {
  console.error('Error:', error.message);
}
