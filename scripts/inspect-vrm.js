import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { readFileSync } from 'fs';

const vrmPath = process.argv[2] || './Mafuyu_VRM.vrm';

console.log(`🔍 Inspecting VRM file: ${vrmPath}\n`);

const loader = new GLTFLoader();
loader.register((parser) => new VRMLoaderPlugin(parser));

try {
  const buffer = readFileSync(vrmPath);
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

  loader.parse(arrayBuffer, '', (gltf) => {
    const vrm = gltf.userData.vrm;

    console.log('📦 VRM Information');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📋 VRM Version:', vrm.meta?.metaVersion || 'Unknown');
    console.log('👤 Model Name:', vrm.meta?.name || 'Unnamed');
    console.log('✍️  Author:', vrm.meta?.authors?.[0] || 'Unknown');
    console.log('');

    if (vrm.expressionManager) {
      console.log('😊 AVAILABLE EXPRESSIONS');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      const expressions = vrm.expressionManager.expressions;
      const expressionNames = Object.keys(expressions);

      console.log(`Total expressions: ${expressionNames.length}\n`);

      if (expressionNames.length > 0) {
        expressionNames.forEach((name, index) => {
          const expression = expressions[name];
          console.log(`${index + 1}. "${name}"`);

          if (expression.isBinary !== undefined) {
            console.log(`   - Type: ${expression.isBinary ? 'Binary (On/Off)' : 'Analog (0-1)'}`);
          }

          if (expression.overrideBlink) {
            console.log(`   - Overrides: Blink`);
          }
          if (expression.overrideLookAt) {
            console.log(`   - Overrides: LookAt`);
          }
          if (expression.overrideMouth) {
            console.log(`   - Overrides: Mouth`);
          }

          console.log('');
        });

        console.log('\n💡 SUGGESTED HOTKEY MAPPING');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const presetExpressions = expressionNames.filter(name =>
          ['happy', 'angry', 'sad', 'relaxed', 'surprised', 'neutral'].includes(name.toLowerCase())
        );

        const customExpressions = expressionNames.filter(name =>
          !['happy', 'angry', 'sad', 'relaxed', 'surprised', 'neutral', 'blink', 'aa', 'ih', 'ou', 'ee', 'oh'].includes(name.toLowerCase())
        );

        console.log('\n📌 Preset Expressions (VRM Standard):');
        if (presetExpressions.length > 0) {
          presetExpressions.forEach((name, i) => {
            if (i < 9) {
              console.log(`   Key ${i + 1}: ${name}`);
            }
          });
        } else {
          console.log('   (None found)');
        }

        console.log('\n🎨 Custom Expressions:');
        if (customExpressions.length > 0) {
          customExpressions.forEach((name, i) => {
            const keyIndex = presetExpressions.length + i + 1;
            if (keyIndex <= 9) {
              console.log(`   Key ${keyIndex}: ${name}`);
            }
          });
        } else {
          console.log('   (None found)');
        }

        console.log('\n⚠️  Note: Keys 1-9 can be used for expressions');
        console.log('   Mouth shapes (aa, ih, ou, ee, oh) are controlled by voice/tracking');

      } else {
        console.log('❌ No expressions found in this VRM model\n');
      }
    } else {
      console.log('❌ No expression manager found\n');
    }

    if (vrm.humanoid) {
      console.log('\n🦴 HUMANOID BONES');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      const boneNames = Object.keys(vrm.humanoid.humanBones);
      console.log(`Total bones: ${boneNames.length}`);
      console.log(`Bones: ${boneNames.slice(0, 10).join(', ')}${boneNames.length > 10 ? '...' : ''}\n`);
    }

    if (vrm.lookAt) {
      console.log('👀 LOOK AT');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Eye tracking: Available\n');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Inspection complete\n');

  }, (error) => {
    console.error('❌ Error parsing VRM:', error);
  });
} catch (error) {
  console.error('❌ Error reading file:', error.message);
}
