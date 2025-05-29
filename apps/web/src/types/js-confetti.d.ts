declare module "js-confetti" {
    export default class JSConfetti {
      constructor(options?: any);
      addConfetti(options?: any): Promise<void>;
    }
  }