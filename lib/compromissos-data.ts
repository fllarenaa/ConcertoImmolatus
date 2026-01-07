
export type Musica = {
  id: string
  nome: string
  partituras: string[]
  audios: {
    soprano: string
    alto: string
    tenor: string
    baixo: string
  }
  videoYoutubeId?: string
}

export type Compromisso = {
  id: string
  nome: string
  imagem: string
  musicas: Musica[]
  repertorioPdf: string
  videoYoutubeId?: string
}

export const compromissosData: Compromisso[] = [
  {
    id: "1",
    nome: "1° Concerto de Páscoa EAC PSAMD",
    imagem: "/igreja-catolica-pascoa.jpg",
    repertorioPdf: "/repertorios/pascoa-completo.pdf",
    videoYoutubeId: "AaV7WH-V0oI?si=el-2Isa_aUdyhZww",
    musicas: [
      {
        id: "m1",
        nome: "1°Cristo Nossa Páscoa",
        partituras: ["/partituras/Cristo-Nossa-Pascoa/page-0001.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0002.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0003.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0004.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0005.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0006.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0007.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0008.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0009.jpg", "/partituras/Cristo-Nossa-Pascoa/page-0010.jpg"],
        audios: {
          soprano: "/audios/Cristo-Nossa-Pascoa/Soprano.mp4",

          alto: "/audios/Cristo-Nossa-Pascoa/Contralto.mp4",
          tenor: "/audios/Cristo-Nossa-Pascoa/Tenor.mp4",
          baixo: "/audios/Cristo-Nossa-Pascoa/Baixo.mp4",
        },
        videoYoutubeId: "AaV7WH-V0oI?si=el-2Isa_aUdyhZww",
      },
      {
        id: "m2",
        nome: "2° O Cordeiro que foi Imolado",
        partituras: ["/partituras/O-Cordeiro-que-foi-Imolado/page1.jpg", "/partituras/O-Cordeiro-que-foi-Imolado/page2.jpg"],
        audios: {
          soprano: "/audios/O-Cordeiro-que-foi-Imolado/Soprano.mp4",

          alto: "/audios/O-Cordeiro-que-foi-Imolado/Contralto.mp4",
          tenor: "/audios/O-Cordeiro-que-foi-Imolado/Tenor.mp4",
          baixo: "/audios/O-Cordeiro-que-foi-Imolado/Baixo.mp4",
        },
        videoYoutubeId: "-M9mf7c4218?si=QdxTnAHs8lQIaRmR",
      },
       {
        id: "m3 ",
        nome: "3° O CRUX AVE, SPES UNICA",
        partituras: ["/partituras/CRUX-AVE-SPES-UNICA/page1.png"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "3Uy2x9vyRTQ?si=hsMuFZt8SjRlsX5B",
      },
       {
        id: "m4",
        nome: "4° Anima Christi",
        partituras: ["/partituras/Anima-Christi/page-0001.jpg", "/partituras/Anima-Christi/page-0002.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "mQ1myt4-gX4?si=0zDfCIDT3OuHINfE",
      },
         {
        id: "m5",
        nome: "5° Alleluia",
        partituras: ["/partituras/Alleluia/page-0001.jpg", "/partituras/Alleluia/page-0002.jpg", "/partituras/Alleluia/page-0003.jpg", "/partituras/Alleluia/page-0004.jpg"],
        audios: {
          soprano: "/audios/Alleluia/Soprano.mp4",
          alto: "/audios/Alleluia/Alto.mp4",
          tenor: "/audios/Alleluia/Tenor.mp4",
          baixo: "/audios/Alleluia/Baixo.mp4",
        },
        videoYoutubeId: "mQ1myt4-gX4?si=0zDfCIDT3OuHINfE",
      },
        {
        id: "m6",
        nome: "6° Laudate Dominum",
        partituras: ["/partituras/Laudate-Dominum/page-0001.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "ExqeT5cowbI?si=mpH_swo0dm-Fq13d",
      },
       {
        id: "m7",
        nome: "7° Regina Coeli",
        partituras: ["/partituras/Regina-Coeli/page-0001.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "JGS5v-M5hc0?si=6Nkzo7goBAFtF-1U",
      },
       {
        id: "m8",
        nome: "8° Ave Verum Corpus",
        partituras: ["/partituras/Ave-Verum/page-0001.jpg", "/partituras/Ave-Verum/page-0002.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "pscsAvGjQI0?si=BTL_qT4YtvKHFCjq",
      },
       {
        id: "m9",
        nome: "9° Ó Hóstia Santa",
        partituras: ["/partituras/Ó-Hóstia-Santa/page-0001.jpg","/partituras/Ó-Hóstia-Santa/page-0002.jpg", "/partituras/Ó-Hóstia-Santa/page-0003.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "Tn5M-ZkTwiU?si=dBBNq9oXvJ-NkPbH",
      },
       {
        id: "m10",
        nome: "10° O Senhor Ressuscitou",
        partituras: ["/partituras/O-Senhor-Ressuscitou/page-0001.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "egxOCqdYCp4?si=qs__JrDHy_VpCpfS",
      },
       {
        id: "m11",
        nome: "11° Tarde Te Amei",
        partituras: ["/partituras/Laudate-Dominum/page-001.jpg"],
        audios: {
          soprano: "a",
          alto: "a",
          tenor: "a",
          baixo: "a",
        },
        videoYoutubeId: "CZqh-p0fNFQ?si=poHpOStFBTE61VQ4",
      },
    ],
  },
  // {
  //   id: "2",
  //   nome: "Missa de Natal",
  //   imagem: "/igreja-catolica-natal.jpg",
  //   repertorioPdf: "/repertorios/natal-completo.pdf",
  //   videoYoutubeId: "dQw4w9WgXcQ",
  //   musicas: [
  //     {
  //       id: "m3",
  //       nome: "Noite Feliz",
  //       partituras: ["/partituras/noite-p1.jpg", "/partituras/noite-p2.jpg", "/partituras/noite-p3.jpg"],
  //       audios: {
  //         soprano: "/audios/noite-soprano.mp3",
  //         alto: "/audios/noite-alto.mp3",
  //         tenor: "/audios/noite-tenor.mp3",
  //         baixo: "/audios/noite-baixo.mp3",
  //       },
  //       videoYoutubeId: "dQw4w9WgXcQ",
  //     },
  //     {
  //       id: "m4",
  //       nome: "Ave Maria",
  //       partituras: ["/partituras/ave-p1.jpg", "/partituras/ave-p2.jpg"],
  //       audios: {
  //         soprano: "/audios/ave-soprano.mp3",
  //         alto: "/audios/ave-alto.mp3",
  //         tenor: "/audios/ave-tenor.mp3",
  //         baixo: "/audios/ave-baixo.mp3",
  //       },
  //       videoYoutubeId: "jNQXAC9IVRw",
  //     },
  //   ],
  // },
  // {
  //   id: "3",
  //   nome: "Festa de Pentecostes",
  //   imagem: "/igreja-catolica-pentecostes.jpg",
  //   repertorioPdf: "/repertorios/pentecostes-completo.pdf",
  //   videoYoutubeId: "dQw4w9WgXcQ",
  //   musicas: [
  //     {
  //       id: "m5",
  //       nome: "Vem Espírito Santo",
  //       partituras: ["/partituras/espirito-p1.jpg"],
  //       audios: {
  //         soprano: "/audios/espirito-soprano.mp3",
  //         alto: "/audios/espirito-alto.mp3",
  //         tenor: "/audios/espirito-tenor.mp3",
  //         baixo: "/audios/espirito-baixo.mp3",
  //       },
  //       videoYoutubeId: "dQw4w9WgXcQ",
  //     },
  //   ],
  // },
]
