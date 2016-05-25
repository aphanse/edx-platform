;(function (define) {
    'use strict';

    define(['backbone',
            'jquery',
            'underscore',
            'gettext',
            'js/learner_dashboard/views/collection_list_view',
            'js/learner_dashboard/views/course_card_view',
            'text!../../../templates/learner_dashboard/program_details_view.underscore'
           ],
         function(
             Backbone,
             $,
             _,
             gettext,
             CollectionListView,
             CourseCardView,
             pageTpl
         ) {
            return Backbone.View.extend({
                el: '.js-program-details-wrapper',

                tpl: _.template(pageTpl),

                initialize: function(data) {
                    this.context = data;
                    this.render();
                },

                render: function() {
                    this.$el.html(this.tpl(this.context));
                    this.postRender();
                },

                postRender: function() {
                    // Add subviews
                    new CollectionListView({
                        el: '.js-course-list',
                        childView: CourseCardView,
                        collection: new Backbone.Collection(this.context.course_codes),
                        context: this.context,
                        titleContext: {
                            el: 'h2',
                            title: 'Course List'
                        }
                    }).render();
                }
            });
        }
    );
}).call(this, define || RequireJS.define);
