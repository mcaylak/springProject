
define(['text!components/userRegister/UserRegisterTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({});

    var CityCollection = Backbone.Collection.extend({
        url: "/api/user",
        model: CityModel
    });
    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});
        },
        events: {
            'submit #registerForm': 'registerForm'

        },
        registerForm: function (e) {

            if (document.getElementById("userName").value == "") {
                alert("User Name is cannot be empty!");
            }
            else if (document.getElementById("userNickname").value == "") {
                alert("User nickname cannot be empty!");
            }
            else if (document.getElementById("userPassword").value == "" || document.getElementById("userPassword1").value == "") {
                alert("User Password cannot be empty!");
            }
            else if(document.getElementById("userPassword").value != document.getElementById("userPassword1").value){
                alert("Passwords do not match")
            }
            else if(document.getElementById("userPassword").value.length < 8){
                alert("Password must be at least 8 characters")
            }else{
                e.preventDefault();
                var city = new CityModel({
                    userName: $("#userName").val(),
                    userPassword:$("#userPassword").val(),
                    userNickname:$("#userNickname").val()

                });
                this.cities.create(city, {wait: true});
            }
        },
        render: function () {
            this.$el.html(cityTemplate({cities: this.cities.toJSON()}));
        }
    });
});