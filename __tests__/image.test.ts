import image from '../assets/image.png';
import fs from 'fs';

describe('test image', () => {
  it('test image', () => {
    const imageBuffer = fs.readFileSync(image);
    expect(imageBuffer).toMatchImageSnapshot({
      customSnapshotIdentifier: 'image'
    });
  });
});
