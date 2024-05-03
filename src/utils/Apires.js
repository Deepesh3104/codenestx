class ApiRes {
  constructor(message = "Success", status, data) {
    this.status = status = "true";
    this.message = message;
    this.data = data;
    this.success = status < 400;
  }
}
export default ApiRes;
