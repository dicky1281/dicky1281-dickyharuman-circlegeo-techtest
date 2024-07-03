// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head:{
      htmlAttrs: {
        lang:'id-ID'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title:'DickyPH | CircleGeo Tech Test ',
      meta:[
        { name: 'description', content: 'DickyPH | CircleGeo Tech Test' }
      ],
      link:[
        {rel:'stylesheet', href:'https://fonts.googleapis.com/css?family=Poppins'}
      ]
    }
  },
})
