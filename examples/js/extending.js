var UserModel = function (data) {
    TruxModel.call(this, data.username);
    this.prototype = TruxModel;

    this.setData(data);

    this.getUsername = function () {
        return this.data.username;
    };

    this.getAge = function () {
        var then = Date.parse(this.data.dob);
        var now = Date.parse(Date.getFullYear() + '-' + (Date.getMonth() + 1) + '-' + Date.getDate());

        return now - then;
    };

    return this;
};
