export class HttPError {
    constructor(status = 500, statusText, error) {
      this.status = status;
      this.description = statusText;
      error && (this.details = error);
    }
  }