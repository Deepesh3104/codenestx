class Apierr {
  constructor(status, message = "Something went wrong", errors = []) {
    // super(message);
    this.status = status;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;
  }
}

export default Apierr;
