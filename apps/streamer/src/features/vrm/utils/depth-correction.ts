import * as Kalidokit from "kalidokit";

export class DepthScaleCorrector {
  private baselineShoulderWidth = 0;
  private readonly SHOULDER_WIDTH_SAMPLES = 30;
  private sampleCount = 0;

  private calculateShoulderWidth(pose2D: any): number {
    if (!pose2D || !pose2D[11] || !pose2D[12]) return 0;

    const leftShoulder = pose2D[11];
    const rightShoulder = pose2D[12];

    return Math.sqrt(
      Math.pow(leftShoulder.x - rightShoulder.x, 2) +
      Math.pow(leftShoulder.y - rightShoulder.y, 2)
    );
  }

  calibrate(pose2D: any): boolean {
    if (this.sampleCount >= this.SHOULDER_WIDTH_SAMPLES) return true;

    const width = this.calculateShoulderWidth(pose2D);
    if (width > 0) {
      this.baselineShoulderWidth =
        (this.baselineShoulderWidth * this.sampleCount + width) / (this.sampleCount + 1);
      this.sampleCount++;
    }

    return this.sampleCount >= this.SHOULDER_WIDTH_SAMPLES;
  }

  correctDepth(pose2D: any, zValue: number): number {
    if (this.sampleCount < this.SHOULDER_WIDTH_SAMPLES) return zValue;

    const currentWidth = this.calculateShoulderWidth(pose2D);
    if (currentWidth === 0 || this.baselineShoulderWidth === 0) return zValue;

    const scaleFactor = currentWidth / this.baselineShoulderWidth;

    return zValue * scaleFactor;
  }

  reset(): void {
    this.baselineShoulderWidth = 0;
    this.sampleCount = 0;
  }
}

export class MovingAverageFilter {
  private readonly windowSize: number;
  private buffer: number[] = [];

  constructor(windowSize: number = 5) {
    this.windowSize = windowSize;
  }

  filter(value: number): number {
    this.buffer.push(value);

    if (this.buffer.length > this.windowSize) {
      this.buffer.shift();
    }

    return this.buffer.reduce((sum, v) => sum + v, 0) / this.buffer.length;
  }

  reset(): void {
    this.buffer = [];
  }
}

export class ExponentialMovingAverage {
  private previousValue: number | null = null;
  private readonly alpha: number;

  constructor(alpha: number = 0.3) {
    this.alpha = Math.max(0, Math.min(1, alpha));
  }

  filter(value: number): number {
    if (this.previousValue === null) {
      this.previousValue = value;
      return value;
    }

    const filtered = this.alpha * value + (1 - this.alpha) * this.previousValue;
    this.previousValue = filtered;
    return filtered;
  }

  reset(): void {
    this.previousValue = null;
  }
}

export class PhysicalConstraint {
  private readonly MIN_Z = -2.0;
  private readonly MAX_Z = 2.0;

  constrain(zValue: number): number {
    return Math.max(this.MIN_Z, Math.min(this.MAX_Z, zValue));
  }
}

export class FaceBasedDepthEstimator {
  private baselineFaceSize = 0;
  private readonly FACE_SIZE_SAMPLES = 30;
  private sampleCount = 0;

  private calculateFaceSize(faceLandmarks: any): number {
    if (!faceLandmarks || faceLandmarks.length === 0) return 0;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let i = 0; i <= 16; i++) {
      const lm = faceLandmarks[i];
      if (lm) {
        minX = Math.min(minX, lm.x);
        maxX = Math.max(maxX, lm.x);
        minY = Math.min(minY, lm.y);
        maxY = Math.max(maxY, lm.y);
      }
    }

    return Math.sqrt(Math.pow(maxX - minX, 2) + Math.pow(maxY - minY, 2));
  }

  calibrate(faceLandmarks: any): boolean {
    if (this.sampleCount >= this.FACE_SIZE_SAMPLES) return true;

    const size = this.calculateFaceSize(faceLandmarks);
    if (size > 0) {
      this.baselineFaceSize =
        (this.baselineFaceSize * this.sampleCount + size) / (this.sampleCount + 1);
      this.sampleCount++;
    }

    return this.sampleCount >= this.FACE_SIZE_SAMPLES;
  }

  estimateDepth(faceLandmarks: any): number {
    if (this.sampleCount < this.FACE_SIZE_SAMPLES) return 0;

    const currentSize = this.calculateFaceSize(faceLandmarks);
    if (currentSize === 0 || this.baselineFaceSize === 0) return 0;

    const ratio = currentSize / this.baselineFaceSize;
    return (ratio - 1.0) * 3.0;
  }

  reset(): void {
    this.baselineFaceSize = 0;
    this.sampleCount = 0;
  }
}

export class DepthCorrectionSystem {
  private scaleCorrector = new DepthScaleCorrector();
  private faceDepthEstimator = new FaceBasedDepthEstimator();
  private zFilter = new ExponentialMovingAverage(0.2);
  private constraint = new PhysicalConstraint();

  private isCalibrated = false;
  private calibrationProgress = 0;

  correctZ(results: any, originalZ: number): number {
    const pose2D = results.poseLandmarks;
    const faceLandmarks = results.faceLandmarks;

    if (!this.isCalibrated) {
      const scaleCalibrated = this.scaleCorrector.calibrate(pose2D);
      const faceCalibrated = this.faceDepthEstimator.calibrate(faceLandmarks);

      this.calibrationProgress = (
        (scaleCalibrated ? 50 : 0) +
        (faceCalibrated ? 50 : 0)
      );

      this.isCalibrated = scaleCalibrated && faceCalibrated;

      if (this.isCalibrated) {
        console.log("✅ Depth correction system calibrated");
      }

      return originalZ;
    }

    let correctedZ = this.scaleCorrector.correctDepth(pose2D, originalZ);

    const faceDepth = this.faceDepthEstimator.estimateDepth(faceLandmarks);
    correctedZ = correctedZ * 0.7 + faceDepth * 0.3;

    correctedZ = this.zFilter.filter(correctedZ);

    correctedZ = this.constraint.constrain(correctedZ);

    return correctedZ;
  }

  getCalibrationProgress(): number {
    return this.calibrationProgress;
  }

  isReady(): boolean {
    return this.isCalibrated;
  }

  reset(): void {
    this.scaleCorrector.reset();
    this.faceDepthEstimator.reset();
    this.zFilter.reset();
    this.isCalibrated = false;
    this.calibrationProgress = 0;
  }
}
