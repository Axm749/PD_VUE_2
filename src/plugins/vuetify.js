import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint:{
        mobileBreakpoint: 'sm'
    },
    theme: {
        themes: {
          light: {
            // primary: colors.green.lighten1, // #E53935
            // secondary: colors.lightGreen.lighten2, // #FFCDD2
            // accent: colors.green.accent1, // #3F51B5
            // error: colors.red.darken2,
            // success: colors.lightGreen.lighten2,
            

            primary: colors.blue.lighten1, // #E53935
            secondary: colors.lightGreen.lighten2, // #FFCDD2
            accent: colors.green.accent1, // #3F51B5
            error: colors.red.darken2,
            success: colors.lightGreen.lighten2
            
          },
          dark:{
            primary: colors.red.darken4, // #E53935
            secondary: colors.red.darken1, // #FFCDD2
            accent: colors.red.accent1, // #3F51B5
            error: colors.grey.darken2,
            success: colors.red.lighten2,
            background: "#000",
            surface: "#FF0000",
          }
        },
      },
});
