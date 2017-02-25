module.exports = mongoose => {
    var User = mongoose.model('User', {
        username: String,
        password: String,
        permission: Array
    });
    return User;
}