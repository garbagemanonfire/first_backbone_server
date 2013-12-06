$(function () { //wait for on ready

    var AppView = Backbone.View.extend({ //Cap letters indicate constructor function
        el: '#random-number-app', //Every backbone view has an associated DOM element.

        events: {
            'click button': 'randomButtonPressed'
        },

        initialize: function(){
            this.render();
        },

        template: function (context){
            console.log(context);
            return '<h1>' + context.rannum + '</h1>' + 
                '<button class="pure-button pure-button-primary">Random</button>';
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        randomButtonPressed: function () {
            this.model.initialize();
        }

    });

    var AppDesc = Backbone.View.extend({
        el: '#random-number-commentary',

        events: {
            'click button': 'randomButtonPressed'
        },

        initialize: function(){
            this.render();
        },

        template: function (context){
            console.log(context);
            return '<h3>' + context.numDesc + '</h3>';
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

        randomButtonPressed: function () {
            this.model.initialize();
        }

    });

    var AppModel = Backbone.Model.extend({

        initialize: function(){
            this.newRandomNumber();
            this.numberDescription(this.get('rannum'));
        },

        newRandomNumber: function (){
            var number = Math.floor(Math.random() * 1000);
            this.set('rannum', number);
            return number;
        },

        numberDescription: function (number){
            if (number > 500) {
                var numDesc = 'Woah thats a big number';
                this.set('numDesc', numDesc);
                return numDesc;
            } else if (number < 100) {
                var numDesc = 'Thats a little number';
                this.set('numDesc', numDesc);
                return numDesc;
            } else {
                var numDesc = 'Thats a number';
                this.set('numDesc', numDesc);
                return numDesc;
            }
        }

    });

    var myModel = new AppModel();
    var app = new AppView({model: myModel});
    var desc = new AppDesc({model: myModel})

    app.listenTo(myModel, 'change', app.render);
    desc.listenTo(myModel, 'change', desc.render);

    window.app = app;
    // window.desc = desc;
});


