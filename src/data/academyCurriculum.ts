// ========================================================
// REALISTISFX EDUTAINMENT ACADEMY CURRICULUM
// 5 SAGAS • 20 SEASONS • 200+ EPISODES
// Tema: Perjalanan Petualangan Serial (One Piece of Trading)
// Season 1 - 2: Edukasi Dasar (Gratis Selamanya)
// Season 3 - 20: Paket Edukasi Mandiri & Anti-MC (Rp 250.000/bln)
// ========================================================

export interface AcademyEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  storyTitle: string;
  synopsis: string;
  educationalTakeaway: string;
  keyPoints: string[];
  duration: string;
  durationSec: number;
  isFree: boolean;
  dummyVideoUrl: string;
}

export interface AcademySeason {
  seasonNumber: number;
  title: string;
  rawTitle: string;
  sagaId: number;
  sagaTitle: string;
  arcName: string;
  tagline: string;
  description: string;
  isFree: boolean;
  totalDuration: string;
  totalEpisodes: number;
  episodes: AcademyEpisode[];
}

export interface AcademySaga {
  id: number;
  sagaNumber: number;
  title: string;
  subTitle: string;
  animeTheme: string;
  description: string;
  seasonRange: string;
  seasonNumbers: number[];
  isFree: boolean;
  totalEpisodes: number;
  seasons: AcademySeason[];
}

export const ALL_SEASONS: AcademySeason[] = [
  {
    "seasonNumber": 1,
    "title": "SEASON 1 — Sejarah Perjalanan Uang dan Lahirnya Forex",
    "rawTitle": "Sejarah Perjalanan Uang dan Lahirnya Forex",
    "sagaId": 1,
    "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
    "arcName": "Dawn of Exchange Arc",
    "tagline": "Sebelum Samudra Emas Ditemukan: Dari Barter Hingga Uang Kertas",
    "description": "Membuka mata kita bahwa uang bukanlah sekadar kertas, melainkan darah kepercayaan peradaban manusia sejak zaman purba.",
    "isFree": true,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s1_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Awal Mula Perdagangan: Sebelum Uang Diciptakan",
        "storyTitle": "Prolog Zaman Purba: Hari Sebelum Emas Menaklukkan Dunia",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Awal Mula Perdagangan: Sebelum Uang Diciptakan' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Awal Mula Perdagangan: Sebelum Uang Diciptakan dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari awal mula perdagangan: sebelum uang diciptakan",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:17",
        "durationSec": 1217,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep1.mp4"
      },
      {
        "id": "s1_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Sistem Barter: Cara Manusia Bertukar Barang",
        "storyTitle": "Jebakan Gandum & Kambing: Lahirnya Kebutuhan Alat Tukar",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sistem Barter: Cara Manusia Bertukar Barang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sistem Barter: Cara Manusia Bertukar Barang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sistem barter: cara manusia bertukar barang",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:34",
        "durationSec": 754,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep2.mp4"
      },
      {
        "id": "s1_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Sejarah Emas dan Perak sebagai Alat Pembayaran",
        "storyTitle": "Kilau Logam Abadi: Saat Perak & Emas Menjadi Penguasa",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah Emas dan Perak sebagai Alat Pembayaran' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sejarah Emas dan Perak sebagai Alat Pembayaran dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sejarah emas dan perak sebagai alat pembayaran",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:51",
        "durationSec": 1191,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep3.mp4"
      },
      {
        "id": "s1_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Lahirnya Uang Kertas dan Sistem Mata Uang",
        "storyTitle": "Surat Janji Kertas: Awal Mula Bankir Menciptakan Uang",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Lahirnya Uang Kertas dan Sistem Mata Uang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Lahirnya Uang Kertas dan Sistem Mata Uang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari lahirnya uang kertas dan sistem mata uang",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:08",
        "durationSec": 668,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep4.mp4"
      },
      {
        "id": "s1_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Awal Mula Pertukaran Mata Uang Antarnegara",
        "storyTitle": "Pelayaran Lintas Benua: Ketika Dua Mata Uang Bertemu di Pelabuhan",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Awal Mula Pertukaran Mata Uang Antarnegara' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Awal Mula Pertukaran Mata Uang Antarnegara dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari awal mula pertukaran mata uang antarnegara",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:25",
        "durationSec": 1105,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep5.mp4"
      },
      {
        "id": "s1_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Gold Standard: Ketika Mata Uang Didukung Emas",
        "storyTitle": "Kutukan Gold Standard: Mengikat Nilai Mata Uang pada Brankas Emas",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Gold Standard: Ketika Mata Uang Didukung Emas' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Gold Standard: Ketika Mata Uang Didukung Emas dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari gold standard: ketika mata uang didukung emas",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:42",
        "durationSec": 642,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep6.mp4"
      },
      {
        "id": "s1_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Perang Dunia dan Perubahan Sistem Keuangan Dunia",
        "storyTitle": "Meriam Perang Dunia: Saat Sistem Moneter Kuno Hancur Berkeping",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perang Dunia dan Perubahan Sistem Keuangan Dunia' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Perang Dunia dan Perubahan Sistem Keuangan Dunia dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari perang dunia dan perubahan sistem keuangan dunia",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:59",
        "durationSec": 1079,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep7.mp4"
      },
      {
        "id": "s1_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Bretton Woods 1944: Awal Sistem Moneter Internasional Modern",
        "storyTitle": "Perjanjian Bretton Woods 1944: Tahta Mahkota Sang Raja Dolar",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bretton Woods 1944: Awal Sistem Moneter Internasional Modern' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bretton Woods 1944: Awal Sistem Moneter Internasional Modern dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bretton woods 1944: awal sistem moneter internasional modern",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:16",
        "durationSec": 1456,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep8.mp4"
      },
      {
        "id": "s1_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Tahun 1971: Berakhirnya Konvertibilitas Dolar AS terhadap Emas",
        "storyTitle": "Nixon Shock 1971: Emas Ditinggalkan, Lahirlah Era Uang Fiat",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Tahun 1971: Berakhirnya Konvertibilitas Dolar AS terhadap Emas' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Tahun 1971: Berakhirnya Konvertibilitas Dolar AS terhadap Emas dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari tahun 1971: berakhirnya konvertibilitas dolar as terhadap emas",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:33",
        "durationSec": 993,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep9.mp4"
      },
      {
        "id": "s1_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Lahirnya Sistem Nilai Tukar Mengambang dan Forex Modern",
        "storyTitle": "Samudra Mengambang: Kelahiran Gelombang Pasar Forex Modern",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Lahirnya Sistem Nilai Tukar Mengambang dan Forex Modern' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Lahirnya Sistem Nilai Tukar Mengambang dan Forex Modern dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari lahirnya sistem nilai tukar mengambang dan forex modern",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:50",
        "durationSec": 1430,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 2,
    "title": "SEASON 2 — Mengenal Dunia Forex Modern",
    "rawTitle": "Mengenal Dunia Forex Modern",
    "sagaId": 1,
    "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
    "arcName": "The Modern Sea Arc",
    "tagline": "Raksasa Laut Menguasai Pasar: Bank Sentral & Retail Trader",
    "description": "Menatap lautan perputaran uang terbesar di muka bumi $7.5 Triliun per hari dan memahami peran kita sebagai nelayan kecil di tengah monster paus institusi.",
    "isFree": true,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s2_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Trading Forex?",
        "storyTitle": "Membuka Gerbang Laut: Apa Sebenarnya Bisnis Forex Itu?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Trading Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Trading Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu trading forex?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:17",
        "durationSec": 1397,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep1.mp4"
      },
      {
        "id": "s2_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Bagaimana Cara Kerja Pasar Forex?",
        "storyTitle": "Pusaran Arus Tersembunyi: Cara Kerja Pasar Keuangan Terbesar",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Cara Kerja Pasar Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bagaimana Cara Kerja Pasar Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bagaimana cara kerja pasar forex?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:34",
        "durationSec": 934,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep2.mp4"
      },
      {
        "id": "s2_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Siapa Saja Pelaku Pasar Forex?",
        "storyTitle": "Para Penguasa Laut: Siapa Monster Paus yang Menggerakkan Ombak?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Siapa Saja Pelaku Pasar Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Siapa Saja Pelaku Pasar Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari siapa saja pelaku pasar forex?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:51",
        "durationSec": 1371,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep3.mp4"
      },
      {
        "id": "s2_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Bank Sentral dan Pengaruhnya terhadap Forex",
        "storyTitle": "Kekuatan Dewa Langit: Bank Sentral & Pengendalian Badai Bunga",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bank Sentral dan Pengaruhnya terhadap Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bank Sentral dan Pengaruhnya terhadap Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bank sentral dan pengaruhnya terhadap forex",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:08",
        "durationSec": 848,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep4.mp4"
      },
      {
        "id": "s2_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Bank Komersial, Institusi, dan Hedge Fund",
        "storyTitle": "Armada Hedge Fund: Bagaimana Paus Memburu Mangsa di Lautan",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bank Komersial, Institusi, dan Hedge Fund' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bank Komersial, Institusi, dan Hedge Fund dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bank komersial, institusi, dan hedge fund",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:25",
        "durationSec": 1285,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep5.mp4"
      },
      {
        "id": "s2_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Retail Trader: Peran Trader Individu",
        "storyTitle": "Perahu Nelayan Kecil: Peran & Kelemahan Terbesar Retail Trader",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Retail Trader: Peran Trader Individu' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Retail Trader: Peran Trader Individu dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari retail trader: peran trader individu",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:42",
        "durationSec": 822,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep6.mp4"
      },
      {
        "id": "s2_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengapa Pasar Forex Menjadi Pasar Keuangan Global?",
        "storyTitle": "Samudra Tanpa Batas: Mengapa Likuiditas $7.5 Triliun Tak Pernah Kering",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Pasar Forex Menjadi Pasar Keuangan Global?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Pasar Forex Menjadi Pasar Keuangan Global? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa pasar forex menjadi pasar keuangan global?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:59",
        "durationSec": 1259,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep7.mp4"
      },
      {
        "id": "s2_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Pasar Forex 24 Jam: Bagaimana Sistemnya?",
        "storyTitle": "Laut Yang Tak Pernah Tidur: 24 Jam Rotasi Matahari di Pasar Finansial",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Pasar Forex 24 Jam: Bagaimana Sistemnya?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Pasar Forex 24 Jam: Bagaimana Sistemnya? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari pasar forex 24 jam: bagaimana sistemnya?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:16",
        "durationSec": 736,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep8.mp4"
      },
      {
        "id": "s2_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Perbedaan Forex Spot, Forward, Futures, dan CFD",
        "storyTitle": "Peta Jenis Kontrak: Perbedaan Spot, Forward, Futures & CFD",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Forex Spot, Forward, Futures, dan CFD' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Perbedaan Forex Spot, Forward, Futures, dan CFD dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari perbedaan forex spot, forward, futures, dan cfd",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:33",
        "durationSec": 1173,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep9.mp4"
      },
      {
        "id": "s2_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Mitos dan Fakta Seputar Trading Forex",
        "storyTitle": "Membongkar Ilusi Halusinasi: Mitos Cepat Kaya vs Realita Bisnis Disiplin",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mitos dan Fakta Seputar Trading Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mitos dan Fakta Seputar Trading Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mitos dan fakta seputar trading forex",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:50",
        "durationSec": 710,
        "isFree": true,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 3,
    "title": "SEASON 3 — Mengenal Mata Uang dan Pasangan Trading",
    "rawTitle": "Mengenal Mata Uang dan Pasangan Trading",
    "sagaId": 1,
    "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
    "arcName": "Allied Currencies Arc",
    "tagline": "Aliansi Mata Uang Dunia: Major, Minor, & Logam Emas",
    "description": "Mengenal bendera dari setiap armada mata uang dunia, kekuatan Dolar AS sebagai raja lautan, dan kilau emas XAUUSD.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s3_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Currency Pair?",
        "storyTitle": "Memilih Pasangan Layar: Misteri Currency Pair 2 Arah",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Currency Pair?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Currency Pair? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu currency pair?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:17",
        "durationSec": 677,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep1.mp4"
      },
      {
        "id": "s3_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Base Currency dan Quote Currency",
        "storyTitle": "Dua Sisi Mata Pedang: Memahami Base vs Quote Currency",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Base Currency dan Quote Currency' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Base Currency dan Quote Currency dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari base currency dan quote currency",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:34",
        "durationSec": 1114,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep2.mp4"
      },
      {
        "id": "s3_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Major Currency Pairs",
        "storyTitle": "Tujuh Pendekar Laut: Major Pairs dengan Arus Likuiditas Raksasa",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Major Currency Pairs' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Major Currency Pairs dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari major currency pairs",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:51",
        "durationSec": 651,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep3.mp4"
      },
      {
        "id": "s3_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Minor Currency Pairs",
        "storyTitle": "Jalur Kepulauan Sunyi: Minor Pairs & Peluang Tersembunyi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Minor Currency Pairs' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Minor Currency Pairs dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari minor currency pairs",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:08",
        "durationSec": 1028,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep4.mp4"
      },
      {
        "id": "s3_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Exotic Currency Pairs",
        "storyTitle": "Lautan Badai Liar: Karakteristik Exotic Pairs yang Menjebak",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Exotic Currency Pairs' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Exotic Currency Pairs dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari exotic currency pairs",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:25",
        "durationSec": 1465,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep5.mp4"
      },
      {
        "id": "s3_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Mengenal USD, EUR, GBP, JPY, CHF, AUD, CAD, dan NZD",
        "storyTitle": "Mengenal Raja Karakter: USD, EUR, GBP, JPY, CHF, AUD, CAD, NZD",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal USD, EUR, GBP, JPY, CHF, AUD, CAD, dan NZD' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal USD, EUR, GBP, JPY, CHF, AUD, CAD, dan NZD dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal usd, eur, gbp, jpy, chf, aud, cad, dan nzd",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:42",
        "durationSec": 1002,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep6.mp4"
      },
      {
        "id": "s3_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengapa Dolar AS Sangat Berpengaruh?",
        "storyTitle": "Diktator Perekonomian: Mengapa Dolar AS Mempengaruhi Seluruh Dunia",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Dolar AS Sangat Berpengaruh?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Dolar AS Sangat Berpengaruh? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa dolar as sangat berpengaruh?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:59",
        "durationSec": 1439,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep7.mp4"
      },
      {
        "id": "s3_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Korelasi Antar Pasangan Mata Uang",
        "storyTitle": "Tali Tak Kasat Mata: Korelasi Positif & Negatif Antara Pasangan Uang",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Korelasi Antar Pasangan Mata Uang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Korelasi Antar Pasangan Mata Uang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari korelasi antar pasangan mata uang",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:16",
        "durationSec": 916,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep8.mp4"
      },
      {
        "id": "s3_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Mengenal XAUUSD atau Gold dalam Trading",
        "storyTitle": "Naga Emas XAUUSD: Karakteristik Emas Sang Pelindung Nilai",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal XAUUSD atau Gold dalam Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal XAUUSD atau Gold dalam Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal xauusd atau gold dalam trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:33",
        "durationSec": 1353,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep9.mp4"
      },
      {
        "id": "s3_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Cara Memilih Pair yang Cocok untuk Pemula",
        "storyTitle": "Memilih Kompas Pertama: Rekomendasi Pair Terbaik untuk Pemula",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memilih Pair yang Cocok untuk Pemula' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memilih Pair yang Cocok untuk Pemula dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memilih pair yang cocok untuk pemula",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:50",
        "durationSec": 890,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 4,
    "title": "SEASON 4 — Memahami Harga dan Istilah Forex",
    "rawTitle": "Memahami Harga dan Istilah Forex",
    "sagaId": 1,
    "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
    "arcName": "Sea Terminology Arc",
    "tagline": "Mantra Pelaut: Bid, Ask, Spread, Pip & Pedang Leverage",
    "description": "Memahami dialek baku para pelaut pasar keuangan agar tidak tertipu oleh istilah kalkulasi margin dan biaya menginap swap.",
    "isFree": false,
    "totalDuration": "160 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s4_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Bid dan Ask?",
        "storyTitle": "Harga Pembelian & Penjualan: Memahami Bid dan Ask",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Bid dan Ask?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Bid dan Ask? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu bid dan ask?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:17",
        "durationSec": 857,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep1.mp4"
      },
      {
        "id": "s4_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Apa Itu Spread?",
        "storyTitle": "Pajak Sang Bandar: Rahasia di Balik Spread Broker",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Spread?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Spread? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu spread?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:34",
        "durationSec": 1294,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep2.mp4"
      },
      {
        "id": "s4_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Apa Itu Pip dan Pipette?",
        "storyTitle": "Langkah Kaki Terkecil: Menghitung Pip dan Pipette Tanpa Ragu",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Pip dan Pipette?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Pip dan Pipette? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu pip dan pipette?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:51",
        "durationSec": 831,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep3.mp4"
      },
      {
        "id": "s4_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Apa Itu Point dalam Trading?",
        "storyTitle": "Titik Poin: Perbedaan Pip vs Point dalam Perhitungan Cepat",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Point dalam Trading?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Point dalam Trading? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu point dalam trading?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:08",
        "durationSec": 1208,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep4.mp4"
      },
      {
        "id": "s4_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Mengenal Lot: Standard, Mini, Micro, dan Nano",
        "storyTitle": "Ukuran Muatan Kapal: Standard, Mini, Micro, & Nano Lot",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Lot: Standard, Mini, Micro, dan Nano' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Lot: Standard, Mini, Micro, dan Nano dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal lot: standard, mini, micro, dan nano",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:25",
        "durationSec": 745,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep5.mp4"
      },
      {
        "id": "s4_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Apa Itu Leverage?",
        "storyTitle": "Pedang Bermata Dua: Mengapa Leverage Tinggi Bisa Menenggelamkan Kapal",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Leverage?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Leverage? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu leverage?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:42",
        "durationSec": 1182,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep6.mp4"
      },
      {
        "id": "s4_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Apa Itu Margin?",
        "storyTitle": "Jaminan Pelayaran: Apa Sebenarnya Margin yang Ditahan Broker?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Margin?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Margin? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu margin?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:59",
        "durationSec": 719,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep7.mp4"
      },
      {
        "id": "s4_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengenal Free Margin dan Margin Level",
        "storyTitle": "Zona Bahaya: Menjaga Free Margin & Membaca Margin Level",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Free Margin dan Margin Level' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Free Margin dan Margin Level dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal free margin dan margin level",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:16",
        "durationSec": 1096,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep8.mp4"
      },
      {
        "id": "s4_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Apa Itu Swap dan Komisi?",
        "storyTitle": "Biaya Berlabuh Tengah Malam: Mengupas Swap & Komisi Broker",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Swap dan Komisi?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Swap dan Komisi? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu swap dan komisi?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:33",
        "durationSec": 633,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep9.mp4"
      },
      {
        "id": "s4_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Mengenal Floating Profit, Floating Loss, dan Equity",
        "storyTitle": "Ilusi Cermin: Membedakan Floating Profit, Floating Loss & Equity Bersih",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Floating Profit, Floating Loss, dan Equity' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Floating Profit, Floating Loss, dan Equity dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal floating profit, floating loss, dan equity",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:50",
        "durationSec": 1070,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 5,
    "title": "SEASON 5 — Mengenal Broker dan Infrastruktur Trading",
    "rawTitle": "Mengenal Broker dan Infrastruktur Trading",
    "sagaId": 2,
    "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
    "arcName": "Shipyard & Pirates Arc",
    "tagline": "Galangan Kapal Jujur vs Perompak Scam Ilegal",
    "description": "Panduan memilih broker legal berlisensi resmi, menghindari jebakan janji titip dana fiktif, dan memahami model eksekusi STP/ECN.",
    "isFree": false,
    "totalDuration": "277 Menit",
    "totalEpisodes": 15,
    "episodes": [
      {
        "id": "s5_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Broker Forex?",
        "storyTitle": "Shipyard & Pirates Arc #1: Menaklukkan Apa Itu Broker Forex?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Broker Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Broker Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu broker forex?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:17",
        "durationSec": 1037,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep1.mp4"
      },
      {
        "id": "s5_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Bagaimana Broker Menghasilkan Keuntungan?",
        "storyTitle": "Shipyard & Pirates Arc #2: Menaklukkan Bagaimana Broker Menghasilkan Keuntungan?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Broker Menghasilkan Keuntungan?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bagaimana Broker Menghasilkan Keuntungan? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bagaimana broker menghasilkan keuntungan?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:34",
        "durationSec": 1474,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep2.mp4"
      },
      {
        "id": "s5_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Perbedaan Broker Market Maker dan ECN",
        "storyTitle": "Shipyard & Pirates Arc #3: Menaklukkan Perbedaan Broker Market Maker dan ECN",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Broker Market Maker dan ECN' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Perbedaan Broker Market Maker dan ECN dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari perbedaan broker market maker dan ecn",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:51",
        "durationSec": 1011,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep3.mp4"
      },
      {
        "id": "s5_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal STP, ECN, dan Model Eksekusi Broker",
        "storyTitle": "Shipyard & Pirates Arc #4: Menaklukkan Mengenal STP, ECN, dan Model Eksekusi Broker",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal STP, ECN, dan Model Eksekusi Broker' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal STP, ECN, dan Model Eksekusi Broker dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal stp, ecn, dan model eksekusi broker",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:08",
        "durationSec": 1388,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep4.mp4"
      },
      {
        "id": "s5_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Apa Itu Liquidity Provider?",
        "storyTitle": "Shipyard & Pirates Arc #5: Menaklukkan Apa Itu Liquidity Provider?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Liquidity Provider?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Liquidity Provider? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu liquidity provider?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:25",
        "durationSec": 925,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep5.mp4"
      },
      {
        "id": "s5_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Mengenal Regulasi Broker Forex",
        "storyTitle": "Shipyard & Pirates Arc #6: Menaklukkan Mengenal Regulasi Broker Forex",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Regulasi Broker Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Regulasi Broker Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal regulasi broker forex",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:42",
        "durationSec": 1362,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep6.mp4"
      },
      {
        "id": "s5_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengapa Industri Forex Membutuhkan Regulasi?",
        "storyTitle": "Shipyard & Pirates Arc #7: Menaklukkan Mengapa Industri Forex Membutuhkan Regulasi?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Industri Forex Membutuhkan Regulasi?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Industri Forex Membutuhkan Regulasi? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa industri forex membutuhkan regulasi?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:59",
        "durationSec": 899,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep7.mp4"
      },
      {
        "id": "s5_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional.",
        "storyTitle": "Shipyard & Pirates Arc #8: Menaklukkan Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal fca, asic, cftc, nfa, dan regulator internasional.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:16",
        "durationSec": 1276,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep8.mp4"
      },
      {
        "id": "s5_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia.",
        "storyTitle": "Shipyard & Pirates Arc #9: Menaklukkan Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari legalitas dan pengawasan perdagangan berjangka di indonesia.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:33",
        "durationSec": 813,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep9.mp4"
      },
      {
        "id": "s5_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal.",
        "storyTitle": "Shipyard & Pirates Arc #10: Menaklukkan Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memeriksa legalitas broker dan menghindari broker ilegal.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:50",
        "durationSec": 1250,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep10.mp4"
      },
      {
        "id": "s5_ep11",
        "episodeNumber": 11,
        "title": "Episode 11 — Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap.",
        "storyTitle": "Shipyard & Pirates Arc #11: Menaklukkan Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari scam forex, money management palsu, dan bahaya janji profit tetap.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:07",
        "durationSec": 727,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep11.mp4"
      },
      {
        "id": "s5_ep12",
        "episodeNumber": 12,
        "title": "Episode 12 — Cara Memilih Broker yang Aman dan Terpercaya",
        "storyTitle": "Shipyard & Pirates Arc #12: Menaklukkan Cara Memilih Broker yang Aman dan Terpercaya",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memilih Broker yang Aman dan Terpercaya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memilih Broker yang Aman dan Terpercaya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memilih broker yang aman dan terpercaya",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:24",
        "durationSec": 1164,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep12.mp4"
      },
      {
        "id": "s5_ep18",
        "episodeNumber": 18,
        "title": "Episode 18 — Perbedaan Akun Standard, Cent, Raw, dan Pro",
        "storyTitle": "Shipyard & Pirates Arc #18: Menaklukkan Perbedaan Akun Standard, Cent, Raw, dan Pro",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Akun Standard, Cent, Raw, dan Pro' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Perbedaan Akun Standard, Cent, Raw, dan Pro dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari perbedaan akun standard, cent, raw, dan pro",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:06",
        "durationSec": 966,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep18.mp4"
      },
      {
        "id": "s5_ep19",
        "episodeNumber": 19,
        "title": "Episode 19 — Demo Account vs Real Account",
        "storyTitle": "Shipyard & Pirates Arc #19: Menaklukkan Demo Account vs Real Account",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Demo Account vs Real Account' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Demo Account vs Real Account dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari demo account vs real account",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:23",
        "durationSec": 1403,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep19.mp4"
      },
      {
        "id": "s5_ep20",
        "episodeNumber": 20,
        "title": "Episode 20 — Kesalahan Pemula Saat Memilih Broker",
        "storyTitle": "Shipyard & Pirates Arc #20: Menaklukkan Kesalahan Pemula Saat Memilih Broker",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Kesalahan Pemula Saat Memilih Broker' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Kesalahan Pemula Saat Memilih Broker dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari kesalahan pemula saat memilih broker",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:40",
        "durationSec": 940,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep20.mp4"
      }
    ]
  },
  {
    "seasonNumber": 6,
    "title": "SEASON 6 — MetaQuotes: Sejarah, Teknologi, dan Ekosistem MetaTrader",
    "rawTitle": "MetaQuotes: Sejarah, Teknologi, dan Ekosistem MetaTrader",
    "sagaId": 2,
    "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
    "arcName": "Cockpit of MetaQuotes Arc",
    "tagline": "Arsitektur Mesin Tempur: Ekosistem MetaTrader",
    "description": "Bedah tuntas software trading paling legendaris di dunia yang menghubungkan komputer kita langsung ke bursa likuiditas internasional.",
    "isFree": false,
    "totalDuration": "190 Menit",
    "totalEpisodes": 11,
    "episodes": [
      {
        "id": "s6_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Mengenal Platform Trading MetaTrader",
        "storyTitle": "Cockpit of MetaQuotes Arc #1: Menaklukkan Mengenal Platform Trading MetaTrader",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Platform Trading MetaTrader' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Platform Trading MetaTrader dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal platform trading metatrader",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:17",
        "durationSec": 1217,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep1.mp4"
      },
      {
        "id": "s6_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Cara Membuat dan Menghubungkan Akun Trading",
        "storyTitle": "Cockpit of MetaQuotes Arc #2: Menaklukkan Cara Membuat dan Menghubungkan Akun Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat dan Menghubungkan Akun Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuat dan Menghubungkan Akun Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuat dan menghubungkan akun trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:34",
        "durationSec": 754,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep2.mp4"
      },
      {
        "id": "s6_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mengenal Market Watch dan Daftar Pair",
        "storyTitle": "Cockpit of MetaQuotes Arc #3: Menaklukkan Mengenal Market Watch dan Daftar Pair",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Market Watch dan Daftar Pair' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Market Watch dan Daftar Pair dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal market watch dan daftar pair",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:51",
        "durationSec": 1191,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep3.mp4"
      },
      {
        "id": "s6_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal Chart dan Candlestick",
        "storyTitle": "Cockpit of MetaQuotes Arc #4: Menaklukkan Mengenal Chart dan Candlestick",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Chart dan Candlestick' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Chart dan Candlestick dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal chart dan candlestick",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:08",
        "durationSec": 668,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep4.mp4"
      },
      {
        "id": "s6_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Cara Mengatur Timeframe dan Tampilan Chart",
        "storyTitle": "Cockpit of MetaQuotes Arc #5: Menaklukkan Cara Mengatur Timeframe dan Tampilan Chart",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengatur Timeframe dan Tampilan Chart' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Mengatur Timeframe dan Tampilan Chart dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara mengatur timeframe dan tampilan chart",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:25",
        "durationSec": 1105,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep5.mp4"
      },
      {
        "id": "s6_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Cara Membuka Posisi Buy dan Sell",
        "storyTitle": "Cockpit of MetaQuotes Arc #6: Menaklukkan Cara Membuka Posisi Buy dan Sell",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuka Posisi Buy dan Sell' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuka Posisi Buy dan Sell dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuka posisi buy dan sell",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:42",
        "durationSec": 642,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep6.mp4"
      },
      {
        "id": "s6_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Cara Memasang Stop Loss dan Take Profit",
        "storyTitle": "Cockpit of MetaQuotes Arc #7: Menaklukkan Cara Memasang Stop Loss dan Take Profit",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Stop Loss dan Take Profit' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memasang Stop Loss dan Take Profit dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memasang stop loss dan take profit",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:59",
        "durationSec": 1079,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep7.mp4"
      },
      {
        "id": "s6_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Cara Memasang Pending Order",
        "storyTitle": "Cockpit of MetaQuotes Arc #8: Menaklukkan Cara Memasang Pending Order",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Pending Order' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memasang Pending Order dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memasang pending order",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:16",
        "durationSec": 1456,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep8.mp4"
      },
      {
        "id": "s6_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Cara Mengubah dan Menutup Posisi Trading",
        "storyTitle": "Cockpit of MetaQuotes Arc #9: Menaklukkan Cara Mengubah dan Menutup Posisi Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengubah dan Menutup Posisi Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Mengubah dan Menutup Posisi Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara mengubah dan menutup posisi trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:33",
        "durationSec": 993,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep9.mp4"
      },
      {
        "id": "s6_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Slippage, Requote, Spread Melebar, dan Risiko Eksekusi.",
        "storyTitle": "Cockpit of MetaQuotes Arc #10: Menaklukkan Slippage, Requote, Spread Melebar, dan Risiko Eksekusi.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Slippage, Requote, Spread Melebar, dan Risiko Eksekusi.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Slippage, Requote, Spread Melebar, dan Risiko Eksekusi. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari slippage, requote, spread melebar, dan risiko eksekusi.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:50",
        "durationSec": 1430,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep10.mp4"
      },
      {
        "id": "s6_ep11",
        "episodeNumber": 11,
        "title": "Episode 11 — Membaca Riwayat Transaksi dan Laporan Trading",
        "storyTitle": "Cockpit of MetaQuotes Arc #11: Menaklukkan Membaca Riwayat Transaksi dan Laporan Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membaca Riwayat Transaksi dan Laporan Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membaca Riwayat Transaksi dan Laporan Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membaca riwayat transaksi dan laporan trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:07",
        "durationSec": 907,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep11.mp4"
      }
    ]
  },
  {
    "seasonNumber": 7,
    "title": "SEASON 7 — Menguasai MetaTrader 4 dan MetaTrader 5",
    "rawTitle": "Menguasai MetaTrader 4 dan MetaTrader 5",
    "sagaId": 2,
    "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
    "arcName": "Mastering the Helm Arc",
    "tagline": "Manual Kemudi MT4 & MT5 Tanpa Ragu",
    "description": "Latihan praktis menekan order Buy, Sell, pasang jaring pengaman Stop Loss, Take Profit, hingga membaca riwayat transaksi secara objektif.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s7_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Mengenal Platform Trading MetaTrader",
        "storyTitle": "Mastering the Helm Arc #1: Menaklukkan Mengenal Platform Trading MetaTrader",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Platform Trading MetaTrader' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Platform Trading MetaTrader dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal platform trading metatrader",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:17",
        "durationSec": 1397,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep1.mp4"
      },
      {
        "id": "s7_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Cara Membuat dan Menghubungkan Akun Trading",
        "storyTitle": "Mastering the Helm Arc #2: Menaklukkan Cara Membuat dan Menghubungkan Akun Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat dan Menghubungkan Akun Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuat dan Menghubungkan Akun Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuat dan menghubungkan akun trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:34",
        "durationSec": 934,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep2.mp4"
      },
      {
        "id": "s7_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mengenal Market Watch dan Daftar Pair",
        "storyTitle": "Mastering the Helm Arc #3: Menaklukkan Mengenal Market Watch dan Daftar Pair",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Market Watch dan Daftar Pair' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Market Watch dan Daftar Pair dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal market watch dan daftar pair",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:51",
        "durationSec": 1371,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep3.mp4"
      },
      {
        "id": "s7_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal Chart dan Candlestick",
        "storyTitle": "Mastering the Helm Arc #4: Menaklukkan Mengenal Chart dan Candlestick",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Chart dan Candlestick' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Chart dan Candlestick dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal chart dan candlestick",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:08",
        "durationSec": 848,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep4.mp4"
      },
      {
        "id": "s7_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Cara Mengatur Timeframe dan Tampilan Chart",
        "storyTitle": "Mastering the Helm Arc #5: Menaklukkan Cara Mengatur Timeframe dan Tampilan Chart",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengatur Timeframe dan Tampilan Chart' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Mengatur Timeframe dan Tampilan Chart dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara mengatur timeframe dan tampilan chart",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:25",
        "durationSec": 1285,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep5.mp4"
      },
      {
        "id": "s7_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Cara Membuka Posisi Buy dan Sell",
        "storyTitle": "Mastering the Helm Arc #6: Menaklukkan Cara Membuka Posisi Buy dan Sell",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuka Posisi Buy dan Sell' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuka Posisi Buy dan Sell dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuka posisi buy dan sell",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:42",
        "durationSec": 822,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep6.mp4"
      },
      {
        "id": "s7_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Cara Memasang Stop Loss dan Take Profit",
        "storyTitle": "Mastering the Helm Arc #7: Menaklukkan Cara Memasang Stop Loss dan Take Profit",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Stop Loss dan Take Profit' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memasang Stop Loss dan Take Profit dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memasang stop loss dan take profit",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:59",
        "durationSec": 1259,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep7.mp4"
      },
      {
        "id": "s7_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Cara Memasang Pending Order",
        "storyTitle": "Mastering the Helm Arc #8: Menaklukkan Cara Memasang Pending Order",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Pending Order' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Memasang Pending Order dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara memasang pending order",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:16",
        "durationSec": 736,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep8.mp4"
      },
      {
        "id": "s7_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Cara Mengubah dan Menutup Posisi Trading",
        "storyTitle": "Mastering the Helm Arc #9: Menaklukkan Cara Mengubah dan Menutup Posisi Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengubah dan Menutup Posisi Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Mengubah dan Menutup Posisi Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara mengubah dan menutup posisi trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:33",
        "durationSec": 1173,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep9.mp4"
      },
      {
        "id": "s7_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Membaca Riwayat Transaksi dan Laporan Trading",
        "storyTitle": "Mastering the Helm Arc #10: Menaklukkan Membaca Riwayat Transaksi dan Laporan Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membaca Riwayat Transaksi dan Laporan Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membaca Riwayat Transaksi dan Laporan Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membaca riwayat transaksi dan laporan trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:50",
        "durationSec": 710,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 8,
    "title": "SEASON 8 — Memahami Mekanisme Transaksi dan Pergerakan Harga",
    "rawTitle": "Memahami Mekanisme Transaksi dan Pergerakan Harga",
    "sagaId": 2,
    "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
    "arcName": "Undercurrent Mechanics Arc",
    "tagline": "Arus Bawah Laut: Cara Harga Bergerak & Bahaya Stop Out",
    "description": "Mengapa candle melonjak naik dan menukik tajam? Menghitung nilai pip presisi dan memahami kenapa broker mengeksekusi Margin Call.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s8_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Bagaimana Harga Forex Bergerak?",
        "storyTitle": "Undercurrent Mechanics Arc #1: Menaklukkan Bagaimana Harga Forex Bergerak?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Harga Forex Bergerak?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bagaimana Harga Forex Bergerak? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bagaimana harga forex bergerak?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:17",
        "durationSec": 677,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep1.mp4"
      },
      {
        "id": "s8_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengapa Harga Bisa Naik dan Turun?",
        "storyTitle": "Undercurrent Mechanics Arc #2: Menaklukkan Mengapa Harga Bisa Naik dan Turun?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Harga Bisa Naik dan Turun?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Harga Bisa Naik dan Turun? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa harga bisa naik dan turun?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:34",
        "durationSec": 1114,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep2.mp4"
      },
      {
        "id": "s8_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga",
        "storyTitle": "Undercurrent Mechanics Arc #3: Menaklukkan Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mekanisme buy: mengambil keuntungan dari kenaikan harga",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:51",
        "durationSec": 651,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep3.mp4"
      },
      {
        "id": "s8_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga",
        "storyTitle": "Undercurrent Mechanics Arc #4: Menaklukkan Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mekanisme sell: mengambil keuntungan dari penurunan harga",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:08",
        "durationSec": 1028,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep4.mp4"
      },
      {
        "id": "s8_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Cara Menghitung Profit dan Loss",
        "storyTitle": "Undercurrent Mechanics Arc #5: Menaklukkan Cara Menghitung Profit dan Loss",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menghitung Profit dan Loss' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menghitung Profit dan Loss dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menghitung profit dan loss",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:25",
        "durationSec": 1465,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep5.mp4"
      },
      {
        "id": "s8_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Cara Menghitung Nilai Pip Berdasarkan Lot",
        "storyTitle": "Undercurrent Mechanics Arc #6: Menaklukkan Cara Menghitung Nilai Pip Berdasarkan Lot",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menghitung Nilai Pip Berdasarkan Lot' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menghitung Nilai Pip Berdasarkan Lot dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menghitung nilai pip berdasarkan lot",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:42",
        "durationSec": 1002,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep6.mp4"
      },
      {
        "id": "s8_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Memahami Slippage dan Requote",
        "storyTitle": "Undercurrent Mechanics Arc #7: Menaklukkan Memahami Slippage dan Requote",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Slippage dan Requote' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Memahami Slippage dan Requote dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari memahami slippage dan requote",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:59",
        "durationSec": 1439,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep7.mp4"
      },
      {
        "id": "s8_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Market Execution vs Pending Execution",
        "storyTitle": "Undercurrent Mechanics Arc #8: Menaklukkan Market Execution vs Pending Execution",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Market Execution vs Pending Execution' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Market Execution vs Pending Execution dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari market execution vs pending execution",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:16",
        "durationSec": 916,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep8.mp4"
      },
      {
        "id": "s8_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Stop Out dan Margin Call",
        "storyTitle": "Undercurrent Mechanics Arc #9: Menaklukkan Stop Out dan Margin Call",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Stop Out dan Margin Call' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Stop Out dan Margin Call dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari stop out dan margin call",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:33",
        "durationSec": 1353,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep9.mp4"
      },
      {
        "id": "s8_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Simulasi Transaksi Forex dari Awal hingga Selesai",
        "storyTitle": "Undercurrent Mechanics Arc #10: Menaklukkan Simulasi Transaksi Forex dari Awal hingga Selesai",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Simulasi Transaksi Forex dari Awal hingga Selesai' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Simulasi Transaksi Forex dari Awal hingga Selesai dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari simulasi transaksi forex dari awal hingga selesai",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:50",
        "durationSec": 890,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 9,
    "title": "SEASON 9 — Dasar-Dasar Analisis Teknikal",
    "rawTitle": "Dasar-Dasar Analisis Teknikal",
    "sagaId": 3,
    "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "arcName": "Stargazing Compass Arc",
    "tagline": "Mata Batin Grafik: Candlestick, Trendline & Key Levels",
    "description": "Melihat kejujuran harga telanjang tanpa tertutup ratusan indikator yang membingungkan. Mengenali benteng Support dan Resistance sejati.",
    "isFree": false,
    "totalDuration": "160 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s9_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Analisis Teknikal?",
        "storyTitle": "Stargazing Compass Arc #1: Menaklukkan Apa Itu Analisis Teknikal?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Analisis Teknikal?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Analisis Teknikal? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu analisis teknikal?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:17",
        "durationSec": 857,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep1.mp4"
      },
      {
        "id": "s9_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengenal Candlestick dan Cara Membacanya",
        "storyTitle": "Stargazing Compass Arc #2: Menaklukkan Mengenal Candlestick dan Cara Membacanya",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Candlestick dan Cara Membacanya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Candlestick dan Cara Membacanya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal candlestick dan cara membacanya",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:34",
        "durationSec": 1294,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep2.mp4"
      },
      {
        "id": "s9_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Memahami Timeframe M1, M5, M15, dan M30",
        "storyTitle": "Stargazing Compass Arc #3: Menaklukkan Memahami Timeframe M1, M5, M15, dan M30",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Timeframe M1, M5, M15, dan M30' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Memahami Timeframe M1, M5, M15, dan M30 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari memahami timeframe m1, m5, m15, dan m30",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:51",
        "durationSec": 831,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep3.mp4"
      },
      {
        "id": "s9_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Memahami Timeframe H1, H4, D1, dan W1",
        "storyTitle": "Stargazing Compass Arc #4: Menaklukkan Memahami Timeframe H1, H4, D1, dan W1",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Timeframe H1, H4, D1, dan W1' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Memahami Timeframe H1, H4, D1, dan W1 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari memahami timeframe h1, h4, d1, dan w1",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:08",
        "durationSec": 1208,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep4.mp4"
      },
      {
        "id": "s9_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Mengenal Struktur Market",
        "storyTitle": "Stargazing Compass Arc #5: Menaklukkan Mengenal Struktur Market",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Struktur Market' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Struktur Market dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal struktur market",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:25",
        "durationSec": 745,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep5.mp4"
      },
      {
        "id": "s9_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Apa Itu Uptrend, Downtrend, dan Sideways?",
        "storyTitle": "Stargazing Compass Arc #6: Menaklukkan Apa Itu Uptrend, Downtrend, dan Sideways?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Uptrend, Downtrend, dan Sideways?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Uptrend, Downtrend, dan Sideways? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu uptrend, downtrend, dan sideways?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:42",
        "durationSec": 1182,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep6.mp4"
      },
      {
        "id": "s9_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal Support dan Resistance",
        "storyTitle": "Stargazing Compass Arc #7: Menaklukkan Mengenal Support dan Resistance",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Support dan Resistance' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Support dan Resistance dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal support dan resistance",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:59",
        "durationSec": 719,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep7.mp4"
      },
      {
        "id": "s9_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Cara Menggambar Trendline",
        "storyTitle": "Stargazing Compass Arc #8: Menaklukkan Cara Menggambar Trendline",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menggambar Trendline' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menggambar Trendline dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menggambar trendline",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:16",
        "durationSec": 1096,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep8.mp4"
      },
      {
        "id": "s9_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Mengenal Area Supply dan Demand",
        "storyTitle": "Stargazing Compass Arc #9: Menaklukkan Mengenal Area Supply dan Demand",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Area Supply dan Demand' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Area Supply dan Demand dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal area supply dan demand",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:33",
        "durationSec": 633,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep9.mp4"
      },
      {
        "id": "s9_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Praktik Membaca Chart Tanpa Indikator",
        "storyTitle": "Stargazing Compass Arc #10: Menaklukkan Praktik Membaca Chart Tanpa Indikator",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Praktik Membaca Chart Tanpa Indikator' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Praktik Membaca Chart Tanpa Indikator dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari praktik membaca chart tanpa indikator",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:50",
        "durationSec": 1070,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 10,
    "title": "SEASON 10 — Menguasai Candlestick Pattern",
    "rawTitle": "Menguasai Candlestick Pattern",
    "sagaId": 3,
    "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "arcName": "Candlestick Runes Arc",
    "tagline": "Bahasa Sandi Lilin Jepang: Pinbar, Engulfing & Doji",
    "description": "Warisan rahasia pedagang beras Jepang abad ke-18 untuk mendeteksi pertarungan berdarah antara pembeli dan penjual di zona kritis.",
    "isFree": false,
    "totalDuration": "190 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s10_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Sejarah dan Fungsi Candlestick dalam Trading",
        "storyTitle": "Candlestick Runes Arc #1: Menaklukkan Sejarah dan Fungsi Candlestick dalam Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah dan Fungsi Candlestick dalam Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sejarah dan Fungsi Candlestick dalam Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sejarah dan fungsi candlestick dalam trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:17",
        "durationSec": 1037,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep1.mp4"
      },
      {
        "id": "s10_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengenal Doji Candle",
        "storyTitle": "Candlestick Runes Arc #2: Menaklukkan Mengenal Doji Candle",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Doji Candle' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Doji Candle dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal doji candle",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:34",
        "durationSec": 1474,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep2.mp4"
      },
      {
        "id": "s10_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mengenal Hammer dan Inverted Hammer",
        "storyTitle": "Candlestick Runes Arc #3: Menaklukkan Mengenal Hammer dan Inverted Hammer",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Hammer dan Inverted Hammer' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Hammer dan Inverted Hammer dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal hammer dan inverted hammer",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:51",
        "durationSec": 1011,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep3.mp4"
      },
      {
        "id": "s10_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal Shooting Star dan Hanging Man",
        "storyTitle": "Candlestick Runes Arc #4: Menaklukkan Mengenal Shooting Star dan Hanging Man",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Shooting Star dan Hanging Man' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Shooting Star dan Hanging Man dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal shooting star dan hanging man",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:08",
        "durationSec": 1388,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep4.mp4"
      },
      {
        "id": "s10_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Mengenal Bullish Engulfing",
        "storyTitle": "Candlestick Runes Arc #5: Menaklukkan Mengenal Bullish Engulfing",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Bullish Engulfing' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Bullish Engulfing dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal bullish engulfing",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:25",
        "durationSec": 925,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep5.mp4"
      },
      {
        "id": "s10_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Mengenal Bearish Engulfing",
        "storyTitle": "Candlestick Runes Arc #6: Menaklukkan Mengenal Bearish Engulfing",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Bearish Engulfing' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Bearish Engulfing dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal bearish engulfing",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:42",
        "durationSec": 1362,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep6.mp4"
      },
      {
        "id": "s10_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal Morning Star dan Evening Star",
        "storyTitle": "Candlestick Runes Arc #7: Menaklukkan Mengenal Morning Star dan Evening Star",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Morning Star dan Evening Star' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Morning Star dan Evening Star dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal morning star dan evening star",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:59",
        "durationSec": 899,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep7.mp4"
      },
      {
        "id": "s10_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengenal Pin Bar dan Rejection Candle",
        "storyTitle": "Candlestick Runes Arc #8: Menaklukkan Mengenal Pin Bar dan Rejection Candle",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Pin Bar dan Rejection Candle' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Pin Bar dan Rejection Candle dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal pin bar dan rejection candle",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:16",
        "durationSec": 1276,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep8.mp4"
      },
      {
        "id": "s10_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Mengenal Inside Bar dan Outside Bar",
        "storyTitle": "Candlestick Runes Arc #9: Menaklukkan Mengenal Inside Bar dan Outside Bar",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Inside Bar dan Outside Bar' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Inside Bar dan Outside Bar dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal inside bar dan outside bar",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:33",
        "durationSec": 813,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep9.mp4"
      },
      {
        "id": "s10_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Menggabungkan Candlestick dengan Support dan Resistance",
        "storyTitle": "Candlestick Runes Arc #10: Menaklukkan Menggabungkan Candlestick dengan Support dan Resistance",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Menggabungkan Candlestick dengan Support dan Resistance' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Menggabungkan Candlestick dengan Support dan Resistance dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari menggabungkan candlestick dengan support dan resistance",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:50",
        "durationSec": 1250,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 11,
    "title": "SEASON 11 — Indikator Teknikal untuk Trader",
    "rawTitle": "Indikator Teknikal untuk Trader",
    "sagaId": 3,
    "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "arcName": "Navigational Tools Arc",
    "tagline": "Kacamata Pelaut: Moving Average, RSI, MACD & Fibonacci",
    "description": "Memanfaatkan indikator matematika sebagai alat konfirmasi pelengkap, bukan sebagai bola kristal peramal masa depan.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s11_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Indikator Teknikal?",
        "storyTitle": "Navigational Tools Arc #1: Menaklukkan Apa Itu Indikator Teknikal?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Indikator Teknikal?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Indikator Teknikal? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu indikator teknikal?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:17",
        "durationSec": 1217,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep1.mp4"
      },
      {
        "id": "s11_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengenal Moving Average (MA)",
        "storyTitle": "Navigational Tools Arc #2: Menaklukkan Mengenal Moving Average (MA)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Moving Average (MA)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Moving Average (MA) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal moving average (ma)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:34",
        "durationSec": 754,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep2.mp4"
      },
      {
        "id": "s11_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mengenal Exponential Moving Average (EMA)",
        "storyTitle": "Navigational Tools Arc #3: Menaklukkan Mengenal Exponential Moving Average (EMA)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Exponential Moving Average (EMA)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Exponential Moving Average (EMA) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal exponential moving average (ema)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:51",
        "durationSec": 1191,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep3.mp4"
      },
      {
        "id": "s11_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal Relative Strength Index (RSI)",
        "storyTitle": "Navigational Tools Arc #4: Menaklukkan Mengenal Relative Strength Index (RSI)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Relative Strength Index (RSI)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Relative Strength Index (RSI) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal relative strength index (rsi)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:08",
        "durationSec": 668,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep4.mp4"
      },
      {
        "id": "s11_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Mengenal Moving Average Convergence Divergence (MACD)",
        "storyTitle": "Navigational Tools Arc #5: Menaklukkan Mengenal Moving Average Convergence Divergence (MACD)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Moving Average Convergence Divergence (MACD)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Moving Average Convergence Divergence (MACD) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal moving average convergence divergence (macd)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:25",
        "durationSec": 1105,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep5.mp4"
      },
      {
        "id": "s11_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Mengenal Bollinger Bands",
        "storyTitle": "Navigational Tools Arc #6: Menaklukkan Mengenal Bollinger Bands",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Bollinger Bands' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Bollinger Bands dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal bollinger bands",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:42",
        "durationSec": 642,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep6.mp4"
      },
      {
        "id": "s11_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal Stochastic Oscillator",
        "storyTitle": "Navigational Tools Arc #7: Menaklukkan Mengenal Stochastic Oscillator",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Stochastic Oscillator' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Stochastic Oscillator dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal stochastic oscillator",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:59",
        "durationSec": 1079,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep7.mp4"
      },
      {
        "id": "s11_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengenal Average True Range (ATR)",
        "storyTitle": "Navigational Tools Arc #8: Menaklukkan Mengenal Average True Range (ATR)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Average True Range (ATR)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Average True Range (ATR) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal average true range (atr)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:16",
        "durationSec": 1456,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep8.mp4"
      },
      {
        "id": "s11_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Mengenal Fibonacci Retracement",
        "storyTitle": "Navigational Tools Arc #9: Menaklukkan Mengenal Fibonacci Retracement",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Fibonacci Retracement' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Fibonacci Retracement dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal fibonacci retracement",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:33",
        "durationSec": 993,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep9.mp4"
      },
      {
        "id": "s11_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Cara Menggabungkan Indikator Tanpa Overload Chart",
        "storyTitle": "Navigational Tools Arc #10: Menaklukkan Cara Menggabungkan Indikator Tanpa Overload Chart",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menggabungkan Indikator Tanpa Overload Chart' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menggabungkan Indikator Tanpa Overload Chart dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menggabungkan indikator tanpa overload chart",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:50",
        "durationSec": 1430,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 12,
    "title": "SEASON 12 — Price Action dan Market Structure",
    "rawTitle": "Price Action dan Market Structure",
    "sagaId": 3,
    "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "arcName": "Observation Haki Arc",
    "tagline": "Jejak Langkah Smart Money: BOS, CHOCH, FVG & Liquidity Sweep",
    "description": "Melihat jebakan para paus pasar yang memburu stop loss trader ritel, dan belajar berlayar mengikuti arus gelombang besar institusi.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s12_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Price Action?",
        "storyTitle": "Observation Haki Arc #1: Menaklukkan Apa Itu Price Action?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Price Action?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Price Action? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu price action?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:17",
        "durationSec": 1397,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep1.mp4"
      },
      {
        "id": "s12_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengenal Swing High dan Swing Low",
        "storyTitle": "Observation Haki Arc #2: Menaklukkan Mengenal Swing High dan Swing Low",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Swing High dan Swing Low' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Swing High dan Swing Low dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal swing high dan swing low",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:34",
        "durationSec": 934,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep2.mp4"
      },
      {
        "id": "s12_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Break of Structure (BOS)",
        "storyTitle": "Observation Haki Arc #3: Menaklukkan Break of Structure (BOS)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Break of Structure (BOS)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Break of Structure (BOS) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari break of structure (bos)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:51",
        "durationSec": 1371,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep3.mp4"
      },
      {
        "id": "s12_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Change of Character (CHOCH)",
        "storyTitle": "Observation Haki Arc #4: Menaklukkan Change of Character (CHOCH)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Change of Character (CHOCH)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Change of Character (CHOCH) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari change of character (choch)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:08",
        "durationSec": 848,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep4.mp4"
      },
      {
        "id": "s12_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Market Structure Shift (MSS)",
        "storyTitle": "Observation Haki Arc #5: Menaklukkan Market Structure Shift (MSS)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Market Structure Shift (MSS)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Market Structure Shift (MSS) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari market structure shift (mss)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:25",
        "durationSec": 1285,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep5.mp4"
      },
      {
        "id": "s12_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Mengenal Liquidity dalam Trading",
        "storyTitle": "Observation Haki Arc #6: Menaklukkan Mengenal Liquidity dalam Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Liquidity dalam Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Liquidity dalam Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal liquidity dalam trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:42",
        "durationSec": 822,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep6.mp4"
      },
      {
        "id": "s12_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Buy Side Liquidity dan Sell Side Liquidity",
        "storyTitle": "Observation Haki Arc #7: Menaklukkan Buy Side Liquidity dan Sell Side Liquidity",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Buy Side Liquidity dan Sell Side Liquidity' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Buy Side Liquidity dan Sell Side Liquidity dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari buy side liquidity dan sell side liquidity",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:59",
        "durationSec": 1259,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep7.mp4"
      },
      {
        "id": "s12_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Liquidity Sweep dan Stop Hunt",
        "storyTitle": "Observation Haki Arc #8: Menaklukkan Liquidity Sweep dan Stop Hunt",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Liquidity Sweep dan Stop Hunt' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Liquidity Sweep dan Stop Hunt dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari liquidity sweep dan stop hunt",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:16",
        "durationSec": 736,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep8.mp4"
      },
      {
        "id": "s12_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Order Block dan Fair Value Gap (FVG)",
        "storyTitle": "Observation Haki Arc #9: Menaklukkan Order Block dan Fair Value Gap (FVG)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Order Block dan Fair Value Gap (FVG)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Order Block dan Fair Value Gap (FVG) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari order block dan fair value gap (fvg)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:33",
        "durationSec": 1173,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep9.mp4"
      },
      {
        "id": "s12_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Praktik Membaca Market Structure dari H1 ke M5",
        "storyTitle": "Observation Haki Arc #10: Menaklukkan Praktik Membaca Market Structure dari H1 ke M5",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Praktik Membaca Market Structure dari H1 ke M5' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Praktik Membaca Market Structure dari H1 ke M5 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari praktik membaca market structure dari h1 ke m5",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:50",
        "durationSec": 710,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 13,
    "title": "SEASON 13 — Analisis Fundamental dan Berita Ekonomi",
    "rawTitle": "Analisis Fundamental dan Berita Ekonomi",
    "sagaId": 3,
    "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "arcName": "Economic Storm Arc",
    "tagline": "Menghadapi Topan Berita: CPI, NFP & Kebijakan Suku Bunga",
    "description": "Bagaimana sebuah pidato gubernur The Fed di Washington dapat mengguncang gelombang ratusan pips dalam hitungan detik.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s13_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Analisis Fundamental?",
        "storyTitle": "Economic Storm Arc #1: Menaklukkan Apa Itu Analisis Fundamental?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Analisis Fundamental?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Analisis Fundamental? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu analisis fundamental?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:17",
        "durationSec": 677,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep1.mp4"
      },
      {
        "id": "s13_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengenal Kalender Ekonomi",
        "storyTitle": "Economic Storm Arc #2: Menaklukkan Mengenal Kalender Ekonomi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Kalender Ekonomi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Kalender Ekonomi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal kalender ekonomi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:34",
        "durationSec": 1114,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep2.mp4"
      },
      {
        "id": "s13_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Apa Itu Inflasi dan CPI?",
        "storyTitle": "Economic Storm Arc #3: Menaklukkan Apa Itu Inflasi dan CPI?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Inflasi dan CPI?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Inflasi dan CPI? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu inflasi dan cpi?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:51",
        "durationSec": 651,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep3.mp4"
      },
      {
        "id": "s13_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal Suku Bunga dan Kebijakan Bank Sentral",
        "storyTitle": "Economic Storm Arc #4: Menaklukkan Mengenal Suku Bunga dan Kebijakan Bank Sentral",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Suku Bunga dan Kebijakan Bank Sentral' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Suku Bunga dan Kebijakan Bank Sentral dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal suku bunga dan kebijakan bank sentral",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:08",
        "durationSec": 1028,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep4.mp4"
      },
      {
        "id": "s13_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Mengenal Federal Reserve dan Kebijakan The Fed",
        "storyTitle": "Economic Storm Arc #5: Menaklukkan Mengenal Federal Reserve dan Kebijakan The Fed",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Federal Reserve dan Kebijakan The Fed' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Federal Reserve dan Kebijakan The Fed dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal federal reserve dan kebijakan the fed",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:25",
        "durationSec": 1465,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep5.mp4"
      },
      {
        "id": "s13_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Apa Itu Non-Farm Payroll (NFP)?",
        "storyTitle": "Economic Storm Arc #6: Menaklukkan Apa Itu Non-Farm Payroll (NFP)?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Non-Farm Payroll (NFP)?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Non-Farm Payroll (NFP)? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu non-farm payroll (nfp)?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:42",
        "durationSec": 1002,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep6.mp4"
      },
      {
        "id": "s13_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal GDP dan Pertumbuhan Ekonomi",
        "storyTitle": "Economic Storm Arc #7: Menaklukkan Mengenal GDP dan Pertumbuhan Ekonomi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal GDP dan Pertumbuhan Ekonomi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal GDP dan Pertumbuhan Ekonomi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal gdp dan pertumbuhan ekonomi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:59",
        "durationSec": 1439,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep7.mp4"
      },
      {
        "id": "s13_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengenal Unemployment Rate dan Data Ketenagakerjaan",
        "storyTitle": "Economic Storm Arc #8: Menaklukkan Mengenal Unemployment Rate dan Data Ketenagakerjaan",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Unemployment Rate dan Data Ketenagakerjaan' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Unemployment Rate dan Data Ketenagakerjaan dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal unemployment rate dan data ketenagakerjaan",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:16",
        "durationSec": 916,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep8.mp4"
      },
      {
        "id": "s13_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Pengaruh Perang, Politik, dan Geopolitik terhadap Forex",
        "storyTitle": "Economic Storm Arc #9: Menaklukkan Pengaruh Perang, Politik, dan Geopolitik terhadap Forex",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Pengaruh Perang, Politik, dan Geopolitik terhadap Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Pengaruh Perang, Politik, dan Geopolitik terhadap Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari pengaruh perang, politik, dan geopolitik terhadap forex",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:33",
        "durationSec": 1353,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep9.mp4"
      },
      {
        "id": "s13_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Cara Membaca Berita untuk Menentukan Risiko Trading",
        "storyTitle": "Economic Storm Arc #10: Menaklukkan Cara Membaca Berita untuk Menentukan Risiko Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membaca Berita untuk Menentukan Risiko Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membaca Berita untuk Menentukan Risiko Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membaca berita untuk menentukan risiko trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:50",
        "durationSec": 890,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 14,
    "title": "SEASON 14 — Sesi Trading dan Karakteristik Pasar",
    "rawTitle": "Sesi Trading dan Karakteristik Pasar",
    "sagaId": 3,
    "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "arcName": "Hunting Seasons Arc",
    "tagline": "Jam Buka 4 Samudra: Sydney, Tokyo, London, New York",
    "description": "Kapan waktu paling aman untuk melempar jala? Memanfaatkan overlap sesi London-New York dengan volatilitas tinggi dan spread tipis.",
    "isFree": false,
    "totalDuration": "160 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s14_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Mengenal Jam Operasional Pasar Forex",
        "storyTitle": "Hunting Seasons Arc #1: Menaklukkan Mengenal Jam Operasional Pasar Forex",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Jam Operasional Pasar Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Jam Operasional Pasar Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal jam operasional pasar forex",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:17",
        "durationSec": 857,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep1.mp4"
      },
      {
        "id": "s14_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Sesi Sydney dan Karakteristiknya",
        "storyTitle": "Hunting Seasons Arc #2: Menaklukkan Sesi Sydney dan Karakteristiknya",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi Sydney dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sesi Sydney dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sesi sydney dan karakteristiknya",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:34",
        "durationSec": 1294,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep2.mp4"
      },
      {
        "id": "s14_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Sesi Tokyo dan Karakteristiknya",
        "storyTitle": "Hunting Seasons Arc #3: Menaklukkan Sesi Tokyo dan Karakteristiknya",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi Tokyo dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sesi Tokyo dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sesi tokyo dan karakteristiknya",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:51",
        "durationSec": 831,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep3.mp4"
      },
      {
        "id": "s14_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Sesi London dan Karakteristiknya",
        "storyTitle": "Hunting Seasons Arc #4: Menaklukkan Sesi London dan Karakteristiknya",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi London dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sesi London dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sesi london dan karakteristiknya",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:08",
        "durationSec": 1208,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep4.mp4"
      },
      {
        "id": "s14_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Sesi New York dan Karakteristiknya",
        "storyTitle": "Hunting Seasons Arc #5: Menaklukkan Sesi New York dan Karakteristiknya",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi New York dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sesi New York dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sesi new york dan karakteristiknya",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:25",
        "durationSec": 745,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep5.mp4"
      },
      {
        "id": "s14_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — London-New York Overlap",
        "storyTitle": "Hunting Seasons Arc #6: Menaklukkan London-New York Overlap",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'London-New York Overlap' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas London-New York Overlap dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari london-new york overlap",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:42",
        "durationSec": 1182,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep6.mp4"
      },
      {
        "id": "s14_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal Volatilitas Setiap Sesi",
        "storyTitle": "Hunting Seasons Arc #7: Menaklukkan Mengenal Volatilitas Setiap Sesi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Volatilitas Setiap Sesi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Volatilitas Setiap Sesi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal volatilitas setiap sesi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:59",
        "durationSec": 719,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep7.mp4"
      },
      {
        "id": "s14_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Spread dan Likuiditas pada Setiap Sesi",
        "storyTitle": "Hunting Seasons Arc #8: Menaklukkan Spread dan Likuiditas pada Setiap Sesi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Spread dan Likuiditas pada Setiap Sesi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Spread dan Likuiditas pada Setiap Sesi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari spread dan likuiditas pada setiap sesi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:16",
        "durationSec": 1096,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep8.mp4"
      },
      {
        "id": "s14_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Memilih Waktu Trading Berdasarkan Strategi",
        "storyTitle": "Hunting Seasons Arc #9: Menaklukkan Memilih Waktu Trading Berdasarkan Strategi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memilih Waktu Trading Berdasarkan Strategi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Memilih Waktu Trading Berdasarkan Strategi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari memilih waktu trading berdasarkan strategi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:33",
        "durationSec": 633,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep9.mp4"
      },
      {
        "id": "s14_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Praktik Membuat Jadwal Trading Harian",
        "storyTitle": "Hunting Seasons Arc #10: Menaklukkan Praktik Membuat Jadwal Trading Harian",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Praktik Membuat Jadwal Trading Harian' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Praktik Membuat Jadwal Trading Harian dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari praktik membuat jadwal trading harian",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:50",
        "durationSec": 1070,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 15,
    "title": "SEASON 15 — Money Management dan Risk Management",
    "rawTitle": "Money Management dan Risk Management",
    "sagaId": 4,
    "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
    "arcName": "Iron Defense Arc",
    "tagline": "Armament Haki 1%: Benteng Anti Hancur & Fixed SL 30 Pips",
    "description": "Hukum keramat pembatas risiko yang membuat akun Anda mustahil terkena Margin Call meskipun diterpa badai kekalahan berturut-turut.",
    "isFree": false,
    "totalDuration": "190 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s15_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Money Management?",
        "storyTitle": "Iron Defense Arc #1: Menaklukkan Apa Itu Money Management?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Money Management?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Money Management? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu money management?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:17",
        "durationSec": 1037,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep1.mp4"
      },
      {
        "id": "s15_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Apa Itu Risk Management?",
        "storyTitle": "Iron Defense Arc #2: Menaklukkan Apa Itu Risk Management?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Risk Management?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Risk Management? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu risk management?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:34",
        "durationSec": 1474,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep2.mp4"
      },
      {
        "id": "s15_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Cara Menentukan Lot Berdasarkan Modal",
        "storyTitle": "Iron Defense Arc #3: Menaklukkan Cara Menentukan Lot Berdasarkan Modal",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menentukan Lot Berdasarkan Modal' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menentukan Lot Berdasarkan Modal dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menentukan lot berdasarkan modal",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:51",
        "durationSec": 1011,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep3.mp4"
      },
      {
        "id": "s15_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Cara Menghitung Risiko 1%, 2%, dan 3%",
        "storyTitle": "Iron Defense Arc #4: Menaklukkan Cara Menghitung Risiko 1%, 2%, dan 3%",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menghitung Risiko 1%, 2%, dan 3%' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menghitung Risiko 1%, 2%, dan 3% dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menghitung risiko 1%, 2%, dan 3%",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:08",
        "durationSec": 1388,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep4.mp4"
      },
      {
        "id": "s15_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Mengenal Risk to Reward Ratio (RR)",
        "storyTitle": "Iron Defense Arc #5: Menaklukkan Mengenal Risk to Reward Ratio (RR)",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Risk to Reward Ratio (RR)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Risk to Reward Ratio (RR) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal risk to reward ratio (rr)",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:25",
        "durationSec": 925,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep5.mp4"
      },
      {
        "id": "s15_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Cara Menentukan Stop Loss yang Rasional",
        "storyTitle": "Iron Defense Arc #6: Menaklukkan Cara Menentukan Stop Loss yang Rasional",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menentukan Stop Loss yang Rasional' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menentukan Stop Loss yang Rasional dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menentukan stop loss yang rasional",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:42",
        "durationSec": 1362,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep6.mp4"
      },
      {
        "id": "s15_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Cara Menentukan Take Profit",
        "storyTitle": "Iron Defense Arc #7: Menaklukkan Cara Menentukan Take Profit",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menentukan Take Profit' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menentukan Take Profit dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menentukan take profit",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:59",
        "durationSec": 899,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep7.mp4"
      },
      {
        "id": "s15_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Apa Itu Drawdown dan Cara Mengendalikannya?",
        "storyTitle": "Iron Defense Arc #8: Menaklukkan Apa Itu Drawdown dan Cara Mengendalikannya?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Drawdown dan Cara Mengendalikannya?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Drawdown dan Cara Mengendalikannya? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu drawdown dan cara mengendalikannya?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:16",
        "durationSec": 1276,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep8.mp4"
      },
      {
        "id": "s15_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Bahaya Overlot dan Overtrading",
        "storyTitle": "Iron Defense Arc #9: Menaklukkan Bahaya Overlot dan Overtrading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bahaya Overlot dan Overtrading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bahaya Overlot dan Overtrading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bahaya overlot dan overtrading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:33",
        "durationSec": 813,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep9.mp4"
      },
      {
        "id": "s15_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Membuat Money Management untuk Akun $100–$10.000",
        "storyTitle": "Iron Defense Arc #10: Menaklukkan Membuat Money Management untuk Akun $100–$10.000",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membuat Money Management untuk Akun $100–$10.000' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membuat Money Management untuk Akun $100–$10.000 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membuat money management untuk akun $100–$10.000",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:50",
        "durationSec": 1250,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 16,
    "title": "SEASON 16 — Strategi Trading Forex dari Pemula hingga Menengah",
    "rawTitle": "Strategi Trading Forex dari Pemula hingga Menengah",
    "sagaId": 4,
    "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
    "arcName": "Battle Styles Arc",
    "tagline": "Gaya Bertarung: Trend Following, Breakout, Scalping & Swing",
    "description": "Menemukan gaya trading yang paling selaras dengan kepribadian Anda, merakit Trading Plan baku, dan disiplin mengeksekusinya.",
    "isFree": false,
    "totalDuration": "263 Menit",
    "totalEpisodes": 15,
    "episodes": [
      {
        "id": "s16_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Trading Strategy?",
        "storyTitle": "Battle Styles Arc #1: Menaklukkan Apa Itu Trading Strategy?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Trading Strategy?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Trading Strategy? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu trading strategy?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:17",
        "durationSec": 1217,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep1.mp4"
      },
      {
        "id": "s16_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Strategi Support dan Resistance",
        "storyTitle": "Battle Styles Arc #2: Menaklukkan Strategi Support dan Resistance",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Support dan Resistance' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Support dan Resistance dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi support dan resistance",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:34",
        "durationSec": 754,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep2.mp4"
      },
      {
        "id": "s16_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Strategi Trend Following",
        "storyTitle": "Battle Styles Arc #3: Menaklukkan Strategi Trend Following",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Trend Following' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Trend Following dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi trend following",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:51",
        "durationSec": 1191,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep3.mp4"
      },
      {
        "id": "s16_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Strategi Moving Average Crossover",
        "storyTitle": "Battle Styles Arc #4: Menaklukkan Strategi Moving Average Crossover",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Moving Average Crossover' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Moving Average Crossover dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi moving average crossover",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:08",
        "durationSec": 668,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep4.mp4"
      },
      {
        "id": "s16_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Strategi Breakout Trading",
        "storyTitle": "Battle Styles Arc #5: Menaklukkan Strategi Breakout Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Breakout Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Breakout Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi breakout trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:25",
        "durationSec": 1105,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep5.mp4"
      },
      {
        "id": "s16_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Strategi Pullback dan Retest",
        "storyTitle": "Battle Styles Arc #6: Menaklukkan Strategi Pullback dan Retest",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Pullback dan Retest' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Pullback dan Retest dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi pullback dan retest",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:42",
        "durationSec": 642,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep6.mp4"
      },
      {
        "id": "s16_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Strategi Supply dan Demand",
        "storyTitle": "Battle Styles Arc #7: Menaklukkan Strategi Supply dan Demand",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Supply dan Demand' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Supply dan Demand dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi supply dan demand",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:59",
        "durationSec": 1079,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep7.mp4"
      },
      {
        "id": "s16_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Strategi Price Action",
        "storyTitle": "Battle Styles Arc #8: Menaklukkan Strategi Price Action",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Price Action' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Price Action dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi price action",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:16",
        "durationSec": 1456,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep8.mp4"
      },
      {
        "id": "s16_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Strategi Scalping dan Intraday",
        "storyTitle": "Battle Styles Arc #9: Menaklukkan Strategi Scalping dan Intraday",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Scalping dan Intraday' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Scalping dan Intraday dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi scalping dan intraday",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:33",
        "durationSec": 993,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep9.mp4"
      },
      {
        "id": "s16_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Strategi Swing Trading dan Position Trading",
        "storyTitle": "Battle Styles Arc #10: Menaklukkan Strategi Swing Trading dan Position Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Swing Trading dan Position Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Swing Trading dan Position Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi swing trading dan position trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:50",
        "durationSec": 1430,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep10.mp4"
      },
      {
        "id": "s16_ep11",
        "episodeNumber": 11,
        "title": "Episode 11 — Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional.",
        "storyTitle": "Battle Styles Arc #11: Menaklukkan Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari perbedaan trader pemula, trader konsisten, dan trader profesional.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:07",
        "durationSec": 907,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep11.mp4"
      },
      {
        "id": "s16_ep12",
        "episodeNumber": 12,
        "title": "Episode 12 — Cara Membuat Trading Plan Profesional.",
        "storyTitle": "Battle Styles Arc #12: Menaklukkan Cara Membuat Trading Plan Profesional.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat Trading Plan Profesional.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuat Trading Plan Profesional. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuat trading plan profesional.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:24",
        "durationSec": 1344,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep12.mp4"
      },
      {
        "id": "s16_ep13",
        "episodeNumber": 13,
        "title": "Episode 13 — Trading Journal: Mencatat dan Menganalisis Setiap Transaksi.",
        "storyTitle": "Battle Styles Arc #13: Menaklukkan Trading Journal: Mencatat dan Menganalisis Setiap Transaksi.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Trading Journal: Mencatat dan Menganalisis Setiap Transaksi.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Trading Journal: Mencatat dan Menganalisis Setiap Transaksi. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari trading journal: mencatat dan menganalisis setiap transaksi.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:41",
        "durationSec": 881,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep13.mp4"
      },
      {
        "id": "s16_ep14",
        "episodeNumber": 14,
        "title": "Episode 14 — Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa.",
        "storyTitle": "Battle Styles Arc #14: Menaklukkan Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari evaluasi mingguan dan bulanan untuk meningkatkan performa.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:58",
        "durationSec": 1318,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep14.mp4"
      },
      {
        "id": "s16_ep15",
        "episodeNumber": 15,
        "title": "Episode 15 — Membangun Karier dan Bisnis di Industri Trading Forex.",
        "storyTitle": "Battle Styles Arc #15: Menaklukkan Membangun Karier dan Bisnis di Industri Trading Forex.",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membangun Karier dan Bisnis di Industri Trading Forex.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membangun Karier dan Bisnis di Industri Trading Forex. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membangun karier dan bisnis di industri trading forex.",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:15",
        "durationSec": 795,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep15.mp4"
      }
    ]
  },
  {
    "seasonNumber": 17,
    "title": "SEASON 17 — Mengenal Gold Trading (XAUUSD)",
    "rawTitle": "Mengenal Gold Trading (XAUUSD)",
    "sagaId": 4,
    "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
    "arcName": "Golden Dragon Arc",
    "tagline": "Menjinakkan Monster Emas XAUUSD: Volatilitas & Peluang",
    "description": "Instrumen paling disukai sekaligus paling mematikan bagi pemula. Kuasai karakteristik gerak emas dan cara menjaganya dengan SOP ketat.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s17_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Sejarah Emas sebagai Instrumen Keuangan",
        "storyTitle": "Golden Dragon Arc #1: Menaklukkan Sejarah Emas sebagai Instrumen Keuangan",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah Emas sebagai Instrumen Keuangan' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sejarah Emas sebagai Instrumen Keuangan dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sejarah emas sebagai instrumen keuangan",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:17",
        "durationSec": 1397,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep1.mp4"
      },
      {
        "id": "s17_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Apa Itu XAUUSD?",
        "storyTitle": "Golden Dragon Arc #2: Menaklukkan Apa Itu XAUUSD?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu XAUUSD?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu XAUUSD? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu xauusd?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:34",
        "durationSec": 934,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep2.mp4"
      },
      {
        "id": "s17_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mengapa Harga Emas Bisa Naik dan Turun?",
        "storyTitle": "Golden Dragon Arc #3: Menaklukkan Mengapa Harga Emas Bisa Naik dan Turun?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Harga Emas Bisa Naik dan Turun?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Harga Emas Bisa Naik dan Turun? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa harga emas bisa naik dan turun?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:51",
        "durationSec": 1371,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep3.mp4"
      },
      {
        "id": "s17_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Hubungan Gold dengan Dolar AS",
        "storyTitle": "Golden Dragon Arc #4: Menaklukkan Hubungan Gold dengan Dolar AS",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Hubungan Gold dengan Dolar AS' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Hubungan Gold dengan Dolar AS dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari hubungan gold dengan dolar as",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:08",
        "durationSec": 848,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep4.mp4"
      },
      {
        "id": "s17_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi",
        "storyTitle": "Golden Dragon Arc #5: Menaklukkan Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari hubungan gold dengan suku bunga dan imbal hasil obligasi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:25",
        "durationSec": 1285,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep5.mp4"
      },
      {
        "id": "s17_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Pengaruh Inflasi dan Geopolitik terhadap Gold",
        "storyTitle": "Golden Dragon Arc #6: Menaklukkan Pengaruh Inflasi dan Geopolitik terhadap Gold",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Pengaruh Inflasi dan Geopolitik terhadap Gold' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Pengaruh Inflasi dan Geopolitik terhadap Gold dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari pengaruh inflasi dan geopolitik terhadap gold",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:42",
        "durationSec": 822,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep6.mp4"
      },
      {
        "id": "s17_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal Karakteristik Volatilitas XAUUSD",
        "storyTitle": "Golden Dragon Arc #7: Menaklukkan Mengenal Karakteristik Volatilitas XAUUSD",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Karakteristik Volatilitas XAUUSD' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Karakteristik Volatilitas XAUUSD dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal karakteristik volatilitas xauusd",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:59",
        "durationSec": 1259,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep7.mp4"
      },
      {
        "id": "s17_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Strategi Support dan Resistance pada Gold",
        "storyTitle": "Golden Dragon Arc #8: Menaklukkan Strategi Support dan Resistance pada Gold",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Support dan Resistance pada Gold' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Support dan Resistance pada Gold dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi support dan resistance pada gold",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:16",
        "durationSec": 736,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep8.mp4"
      },
      {
        "id": "s17_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Strategi Scalping XAUUSD pada M5 dan M15",
        "storyTitle": "Golden Dragon Arc #9: Menaklukkan Strategi Scalping XAUUSD pada M5 dan M15",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Scalping XAUUSD pada M5 dan M15' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Strategi Scalping XAUUSD pada M5 dan M15 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari strategi scalping xauusd pada m5 dan m15",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:33",
        "durationSec": 1173,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep9.mp4"
      },
      {
        "id": "s17_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Simulasi Trading XAUUSD dengan SL, TP, dan Money Management",
        "storyTitle": "Golden Dragon Arc #10: Menaklukkan Simulasi Trading XAUUSD dengan SL, TP, dan Money Management",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Simulasi Trading XAUUSD dengan SL, TP, dan Money Management' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Simulasi Trading XAUUSD dengan SL, TP, dan Money Management dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari simulasi trading xauusd dengan sl, tp, dan money management",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:50",
        "durationSec": 710,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 18,
    "title": "SEASON 18 — Psikologi Trading dan Mental Trader",
    "rawTitle": "Psikologi Trading dan Mental Trader",
    "sagaId": 4,
    "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
    "arcName": "Conqueror Mindset Arc",
    "tagline": "Menundukkan Iblis Mental: Membunuh FOMO & Revenge Trading",
    "description": "Musuh terbesar seorang trader ada di depan cermin. Belajar berdamai dengan kekalahan kecil dan menjaga emosi dingin layaknya seorang sniper.",
    "isFree": false,
    "totalDuration": "175 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s18_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Psikologi Trading?",
        "storyTitle": "Conqueror Mindset Arc #1: Menaklukkan Apa Itu Psikologi Trading?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Psikologi Trading?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Psikologi Trading? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu psikologi trading?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:17",
        "durationSec": 677,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep1.mp4"
      },
      {
        "id": "s18_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengendalikan Emosi Saat Trading",
        "storyTitle": "Conqueror Mindset Arc #2: Menaklukkan Mengendalikan Emosi Saat Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengendalikan Emosi Saat Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengendalikan Emosi Saat Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengendalikan emosi saat trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:34",
        "durationSec": 1114,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep2.mp4"
      },
      {
        "id": "s18_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Mengatasi Rasa Takut Kehilangan Uang",
        "storyTitle": "Conqueror Mindset Arc #3: Menaklukkan Mengatasi Rasa Takut Kehilangan Uang",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengatasi Rasa Takut Kehilangan Uang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengatasi Rasa Takut Kehilangan Uang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengatasi rasa takut kehilangan uang",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:51",
        "durationSec": 651,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep3.mp4"
      },
      {
        "id": "s18_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengatasi Keserakahan atau Greed",
        "storyTitle": "Conqueror Mindset Arc #4: Menaklukkan Mengatasi Keserakahan atau Greed",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengatasi Keserakahan atau Greed' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengatasi Keserakahan atau Greed dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengatasi keserakahan atau greed",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:08",
        "durationSec": 1028,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep4.mp4"
      },
      {
        "id": "s18_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Revenge Trading: Bahaya Membalas Kerugian",
        "storyTitle": "Conqueror Mindset Arc #5: Menaklukkan Revenge Trading: Bahaya Membalas Kerugian",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Revenge Trading: Bahaya Membalas Kerugian' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Revenge Trading: Bahaya Membalas Kerugian dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari revenge trading: bahaya membalas kerugian",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:25",
        "durationSec": 1465,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep5.mp4"
      },
      {
        "id": "s18_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — FOMO: Takut Ketinggalan Peluang",
        "storyTitle": "Conqueror Mindset Arc #6: Menaklukkan FOMO: Takut Ketinggalan Peluang",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'FOMO: Takut Ketinggalan Peluang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas FOMO: Takut Ketinggalan Peluang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari fomo: takut ketinggalan peluang",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:42",
        "durationSec": 1002,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep6.mp4"
      },
      {
        "id": "s18_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Menghadapi Losing Streak",
        "storyTitle": "Conqueror Mindset Arc #7: Menaklukkan Menghadapi Losing Streak",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Menghadapi Losing Streak' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Menghadapi Losing Streak dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari menghadapi losing streak",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:59",
        "durationSec": 1439,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep7.mp4"
      },
      {
        "id": "s18_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengapa Trader Sering Melanggar Aturan Sendiri?",
        "storyTitle": "Conqueror Mindset Arc #8: Menaklukkan Mengapa Trader Sering Melanggar Aturan Sendiri?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Trader Sering Melanggar Aturan Sendiri?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Trader Sering Melanggar Aturan Sendiri? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa trader sering melanggar aturan sendiri?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:16",
        "durationSec": 916,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep8.mp4"
      },
      {
        "id": "s18_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Membangun Disiplin dan Konsistensi",
        "storyTitle": "Conqueror Mindset Arc #9: Menaklukkan Membangun Disiplin dan Konsistensi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membangun Disiplin dan Konsistensi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membangun Disiplin dan Konsistensi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membangun disiplin dan konsistensi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:33",
        "durationSec": 1353,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep9.mp4"
      },
      {
        "id": "s18_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Membentuk Mental Trader Profesional",
        "storyTitle": "Conqueror Mindset Arc #10: Menaklukkan Membentuk Mental Trader Profesional",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membentuk Mental Trader Profesional' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membentuk Mental Trader Profesional dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membentuk mental trader profesional",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:50",
        "durationSec": 890,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 19,
    "title": "SEASON 19 — Backtesting, Trading Journal, dan Evaluasi Strategi",
    "rawTitle": "Backtesting, Trading Journal, dan Evaluasi Strategi",
    "sagaId": 5,
    "sagaTitle": "BAGIAN 5 — TRADING MODERN DAN PENGEMBANGAN SISTEM",
    "arcName": "Poneglyph Journal Arc",
    "tagline": "Kitab Ekspedisi 100 Trade: Backtest, Journal & Data Objektif",
    "description": "Hanya data yang tidak pernah berbohong. Menguji strategi dalam 100 skenario nyata dan menghitung Win Rate serta Profit Factor sejati.",
    "isFree": false,
    "totalDuration": "160 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s19_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Apa Itu Backtesting?",
        "storyTitle": "Poneglyph Journal Arc #1: Menaklukkan Apa Itu Backtesting?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Backtesting?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Backtesting? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu backtesting?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:17",
        "durationSec": 857,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep1.mp4"
      },
      {
        "id": "s19_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Mengapa Strategi Harus Diuji?",
        "storyTitle": "Poneglyph Journal Arc #2: Menaklukkan Mengapa Strategi Harus Diuji?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Strategi Harus Diuji?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengapa Strategi Harus Diuji? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengapa strategi harus diuji?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:34",
        "durationSec": 1294,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep2.mp4"
      },
      {
        "id": "s19_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Cara Melakukan Backtest Manual",
        "storyTitle": "Poneglyph Journal Arc #3: Menaklukkan Cara Melakukan Backtest Manual",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Melakukan Backtest Manual' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Melakukan Backtest Manual dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara melakukan backtest manual",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:51",
        "durationSec": 831,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep3.mp4"
      },
      {
        "id": "s19_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Cara Menggunakan Strategy Tester MT5",
        "storyTitle": "Poneglyph Journal Arc #4: Menaklukkan Cara Menggunakan Strategy Tester MT5",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menggunakan Strategy Tester MT5' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Menggunakan Strategy Tester MT5 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara menggunakan strategy tester mt5",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:08",
        "durationSec": 1208,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep4.mp4"
      },
      {
        "id": "s19_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Memahami Win Rate",
        "storyTitle": "Poneglyph Journal Arc #5: Menaklukkan Memahami Win Rate",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Win Rate' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Memahami Win Rate dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari memahami win rate",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "12:25",
        "durationSec": 745,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep5.mp4"
      },
      {
        "id": "s19_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Memahami Profit Factor dan Expected Value",
        "storyTitle": "Poneglyph Journal Arc #6: Menaklukkan Memahami Profit Factor dan Expected Value",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Profit Factor dan Expected Value' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Memahami Profit Factor dan Expected Value dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari memahami profit factor dan expected value",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "19:42",
        "durationSec": 1182,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep6.mp4"
      },
      {
        "id": "s19_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Menghitung Drawdown dan Recovery Factor",
        "storyTitle": "Poneglyph Journal Arc #7: Menaklukkan Menghitung Drawdown dan Recovery Factor",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Menghitung Drawdown dan Recovery Factor' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Menghitung Drawdown dan Recovery Factor dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari menghitung drawdown dan recovery factor",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "11:59",
        "durationSec": 719,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep7.mp4"
      },
      {
        "id": "s19_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Apa Itu Forward Testing?",
        "storyTitle": "Poneglyph Journal Arc #8: Menaklukkan Apa Itu Forward Testing?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Forward Testing?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Forward Testing? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu forward testing?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "18:16",
        "durationSec": 1096,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep8.mp4"
      },
      {
        "id": "s19_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Cara Membuat Trading Journal",
        "storyTitle": "Poneglyph Journal Arc #9: Menaklukkan Cara Membuat Trading Journal",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat Trading Journal' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuat Trading Journal dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuat trading journal",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "10:33",
        "durationSec": 633,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep9.mp4"
      },
      {
        "id": "s19_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi",
        "storyTitle": "Poneglyph Journal Arc #10: Menaklukkan Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara mengevaluasi strategi berdasarkan 100 transaksi",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:50",
        "durationSec": 1070,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep10.mp4"
      }
    ]
  },
  {
    "seasonNumber": 20,
    "title": "SEASON 20 — EA, Algoritma, AI, dan Menjadi Trader Mandiri",
    "rawTitle": "EA, Algoritma, AI, dan Menjadi Trader Mandiri",
    "sagaId": 5,
    "sagaTitle": "BAGIAN 5 — TRADING MODERN DAN PENGEMBANGAN SISTEM",
    "arcName": "Armada Commander Arc",
    "tagline": "Wisuda Kapten Mandiri: Algoritma, EA, AI & Trader Profesional",
    "description": "Menggabungkan kedisiplinan manusia dengan kecepatan komputasi modern. Melangkah keluar sebagai Trader Realistis Mandiri seumur hidup.",
    "isFree": false,
    "totalDuration": "190 Menit",
    "totalEpisodes": 10,
    "episodes": [
      {
        "id": "s20_ep1",
        "episodeNumber": 1,
        "title": "Episode 1 — Sejarah Perkembangan Algorithmic Trading",
        "storyTitle": "Armada Commander Arc #1: Menaklukkan Sejarah Perkembangan Algorithmic Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah Perkembangan Algorithmic Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Sejarah Perkembangan Algorithmic Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari sejarah perkembangan algorithmic trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "17:17",
        "durationSec": 1037,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep1.mp4"
      },
      {
        "id": "s20_ep2",
        "episodeNumber": 2,
        "title": "Episode 2 — Apa Itu Expert Advisor (EA)?",
        "storyTitle": "Armada Commander Arc #2: Menaklukkan Apa Itu Expert Advisor (EA)?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Expert Advisor (EA)?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Apa Itu Expert Advisor (EA)? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari apa itu expert advisor (ea)?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "24:34",
        "durationSec": 1474,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep2.mp4"
      },
      {
        "id": "s20_ep3",
        "episodeNumber": 3,
        "title": "Episode 3 — Bagaimana Cara Kerja EA pada MT4 dan MT5?",
        "storyTitle": "Armada Commander Arc #3: Menaklukkan Bagaimana Cara Kerja EA pada MT4 dan MT5?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Cara Kerja EA pada MT4 dan MT5?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Bagaimana Cara Kerja EA pada MT4 dan MT5? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari bagaimana cara kerja ea pada mt4 dan mt5?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "16:51",
        "durationSec": 1011,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep3.mp4"
      },
      {
        "id": "s20_ep4",
        "episodeNumber": 4,
        "title": "Episode 4 — Mengenal Dasar Pemrograman MQL4 dan MQL5",
        "storyTitle": "Armada Commander Arc #4: Menaklukkan Mengenal Dasar Pemrograman MQL4 dan MQL5",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Dasar Pemrograman MQL4 dan MQL5' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Dasar Pemrograman MQL4 dan MQL5 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal dasar pemrograman mql4 dan mql5",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "23:08",
        "durationSec": 1388,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep4.mp4"
      },
      {
        "id": "s20_ep5",
        "episodeNumber": 5,
        "title": "Episode 5 — Cara Membuat EA Sederhana",
        "storyTitle": "Armada Commander Arc #5: Menaklukkan Cara Membuat EA Sederhana",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat EA Sederhana' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Membuat EA Sederhana dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara membuat ea sederhana",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "15:25",
        "durationSec": 925,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep5.mp4"
      },
      {
        "id": "s20_ep6",
        "episodeNumber": 6,
        "title": "Episode 6 — Cara Backtest dan Optimasi EA",
        "storyTitle": "Armada Commander Arc #6: Menaklukkan Cara Backtest dan Optimasi EA",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Backtest dan Optimasi EA' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Cara Backtest dan Optimasi EA dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari cara backtest dan optimasi ea",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "22:42",
        "durationSec": 1362,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep6.mp4"
      },
      {
        "id": "s20_ep7",
        "episodeNumber": 7,
        "title": "Episode 7 — Mengenal VPS untuk Menjalankan EA 24 Jam",
        "storyTitle": "Armada Commander Arc #7: Menaklukkan Mengenal VPS untuk Menjalankan EA 24 Jam",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal VPS untuk Menjalankan EA 24 Jam' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal VPS untuk Menjalankan EA 24 Jam dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal vps untuk menjalankan ea 24 jam",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "14:59",
        "durationSec": 899,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep7.mp4"
      },
      {
        "id": "s20_ep8",
        "episodeNumber": 8,
        "title": "Episode 8 — Mengenal Copy Trading, Trading Bot, dan AI Trading",
        "storyTitle": "Armada Commander Arc #8: Menaklukkan Mengenal Copy Trading, Trading Bot, dan AI Trading",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Copy Trading, Trading Bot, dan AI Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Mengenal Copy Trading, Trading Bot, dan AI Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari mengenal copy trading, trading bot, dan ai trading",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "21:16",
        "durationSec": 1276,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep8.mp4"
      },
      {
        "id": "s20_ep9",
        "episodeNumber": 9,
        "title": "Episode 9 — Membangun Sistem Trading Pribadi: Manual atau Otomatis?",
        "storyTitle": "Armada Commander Arc #9: Menaklukkan Membangun Sistem Trading Pribadi: Manual atau Otomatis?",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membangun Sistem Trading Pribadi: Manual atau Otomatis?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Membangun Sistem Trading Pribadi: Manual atau Otomatis? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari membangun sistem trading pribadi: manual atau otomatis?",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "13:33",
        "durationSec": 813,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep9.mp4"
      },
      {
        "id": "s20_ep10",
        "episodeNumber": 10,
        "title": "Episode 10 — Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional",
        "storyTitle": "Armada Commander Arc #10: Menaklukkan Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional",
        "synopsis": "Dalam bab ini, petualang diajak menyelami 'Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
        "educationalTakeaway": "Memahami secara tuntas Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
        "keyPoints": [
          "Konsep dasar dan esensi matematis dari graduation: dari pemula menjadi trader mandiri dan profesional",
          "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
          "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
          "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
        ],
        "duration": "20:50",
        "durationSec": 1250,
        "isFree": false,
        "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep10.mp4"
      }
    ]
  }
];

export const ACADEMY_SAGAS: AcademySaga[] = [
  {
    "id": 1,
    "sagaNumber": 1,
    "title": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
    "subTitle": "Fondasi Awal & Sejarah Pertukaran Nilai Dunia",
    "animeTheme": "East Blue Saga: Pelayaran Pemula Menemukan Log Pose",
    "description": "Perjalanan dimulai dari sebuah pulau terpencil peradaban barter hingga lahirnya sistem nilai tukar mengambang global. Sebelum mengarungi ombak besar, seorang calon kapten trader wajib memahami asal mula pusaran arus keuangan dunia.",
    "seasonRange": "Season 1 - 4",
    "seasonNumbers": [
      1,
      2,
      3,
      4
    ],
    "isFree": true,
    "seasons": [
      {
        "seasonNumber": 1,
        "title": "SEASON 1 — Sejarah Perjalanan Uang dan Lahirnya Forex",
        "rawTitle": "Sejarah Perjalanan Uang dan Lahirnya Forex",
        "sagaId": 1,
        "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
        "arcName": "Dawn of Exchange Arc",
        "tagline": "Sebelum Samudra Emas Ditemukan: Dari Barter Hingga Uang Kertas",
        "description": "Membuka mata kita bahwa uang bukanlah sekadar kertas, melainkan darah kepercayaan peradaban manusia sejak zaman purba.",
        "isFree": true,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s1_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Awal Mula Perdagangan: Sebelum Uang Diciptakan",
            "storyTitle": "Prolog Zaman Purba: Hari Sebelum Emas Menaklukkan Dunia",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Awal Mula Perdagangan: Sebelum Uang Diciptakan' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Awal Mula Perdagangan: Sebelum Uang Diciptakan dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari awal mula perdagangan: sebelum uang diciptakan",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:17",
            "durationSec": 1217,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep1.mp4"
          },
          {
            "id": "s1_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Sistem Barter: Cara Manusia Bertukar Barang",
            "storyTitle": "Jebakan Gandum & Kambing: Lahirnya Kebutuhan Alat Tukar",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sistem Barter: Cara Manusia Bertukar Barang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sistem Barter: Cara Manusia Bertukar Barang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sistem barter: cara manusia bertukar barang",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:34",
            "durationSec": 754,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep2.mp4"
          },
          {
            "id": "s1_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Sejarah Emas dan Perak sebagai Alat Pembayaran",
            "storyTitle": "Kilau Logam Abadi: Saat Perak & Emas Menjadi Penguasa",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah Emas dan Perak sebagai Alat Pembayaran' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sejarah Emas dan Perak sebagai Alat Pembayaran dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sejarah emas dan perak sebagai alat pembayaran",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:51",
            "durationSec": 1191,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep3.mp4"
          },
          {
            "id": "s1_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Lahirnya Uang Kertas dan Sistem Mata Uang",
            "storyTitle": "Surat Janji Kertas: Awal Mula Bankir Menciptakan Uang",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Lahirnya Uang Kertas dan Sistem Mata Uang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Lahirnya Uang Kertas dan Sistem Mata Uang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari lahirnya uang kertas dan sistem mata uang",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:08",
            "durationSec": 668,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep4.mp4"
          },
          {
            "id": "s1_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Awal Mula Pertukaran Mata Uang Antarnegara",
            "storyTitle": "Pelayaran Lintas Benua: Ketika Dua Mata Uang Bertemu di Pelabuhan",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Awal Mula Pertukaran Mata Uang Antarnegara' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Awal Mula Pertukaran Mata Uang Antarnegara dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari awal mula pertukaran mata uang antarnegara",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:25",
            "durationSec": 1105,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep5.mp4"
          },
          {
            "id": "s1_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Gold Standard: Ketika Mata Uang Didukung Emas",
            "storyTitle": "Kutukan Gold Standard: Mengikat Nilai Mata Uang pada Brankas Emas",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Gold Standard: Ketika Mata Uang Didukung Emas' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Gold Standard: Ketika Mata Uang Didukung Emas dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari gold standard: ketika mata uang didukung emas",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:42",
            "durationSec": 642,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep6.mp4"
          },
          {
            "id": "s1_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Perang Dunia dan Perubahan Sistem Keuangan Dunia",
            "storyTitle": "Meriam Perang Dunia: Saat Sistem Moneter Kuno Hancur Berkeping",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perang Dunia dan Perubahan Sistem Keuangan Dunia' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Perang Dunia dan Perubahan Sistem Keuangan Dunia dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari perang dunia dan perubahan sistem keuangan dunia",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:59",
            "durationSec": 1079,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep7.mp4"
          },
          {
            "id": "s1_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Bretton Woods 1944: Awal Sistem Moneter Internasional Modern",
            "storyTitle": "Perjanjian Bretton Woods 1944: Tahta Mahkota Sang Raja Dolar",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bretton Woods 1944: Awal Sistem Moneter Internasional Modern' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bretton Woods 1944: Awal Sistem Moneter Internasional Modern dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bretton woods 1944: awal sistem moneter internasional modern",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:16",
            "durationSec": 1456,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep8.mp4"
          },
          {
            "id": "s1_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Tahun 1971: Berakhirnya Konvertibilitas Dolar AS terhadap Emas",
            "storyTitle": "Nixon Shock 1971: Emas Ditinggalkan, Lahirlah Era Uang Fiat",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Tahun 1971: Berakhirnya Konvertibilitas Dolar AS terhadap Emas' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Tahun 1971: Berakhirnya Konvertibilitas Dolar AS terhadap Emas dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari tahun 1971: berakhirnya konvertibilitas dolar as terhadap emas",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:33",
            "durationSec": 993,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep9.mp4"
          },
          {
            "id": "s1_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Lahirnya Sistem Nilai Tukar Mengambang dan Forex Modern",
            "storyTitle": "Samudra Mengambang: Kelahiran Gelombang Pasar Forex Modern",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Lahirnya Sistem Nilai Tukar Mengambang dan Forex Modern' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Lahirnya Sistem Nilai Tukar Mengambang dan Forex Modern dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari lahirnya sistem nilai tukar mengambang dan forex modern",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:50",
            "durationSec": 1430,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s1/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 2,
        "title": "SEASON 2 — Mengenal Dunia Forex Modern",
        "rawTitle": "Mengenal Dunia Forex Modern",
        "sagaId": 1,
        "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
        "arcName": "The Modern Sea Arc",
        "tagline": "Raksasa Laut Menguasai Pasar: Bank Sentral & Retail Trader",
        "description": "Menatap lautan perputaran uang terbesar di muka bumi $7.5 Triliun per hari dan memahami peran kita sebagai nelayan kecil di tengah monster paus institusi.",
        "isFree": true,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s2_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Trading Forex?",
            "storyTitle": "Membuka Gerbang Laut: Apa Sebenarnya Bisnis Forex Itu?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Trading Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Trading Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu trading forex?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:17",
            "durationSec": 1397,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep1.mp4"
          },
          {
            "id": "s2_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Bagaimana Cara Kerja Pasar Forex?",
            "storyTitle": "Pusaran Arus Tersembunyi: Cara Kerja Pasar Keuangan Terbesar",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Cara Kerja Pasar Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bagaimana Cara Kerja Pasar Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bagaimana cara kerja pasar forex?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:34",
            "durationSec": 934,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep2.mp4"
          },
          {
            "id": "s2_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Siapa Saja Pelaku Pasar Forex?",
            "storyTitle": "Para Penguasa Laut: Siapa Monster Paus yang Menggerakkan Ombak?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Siapa Saja Pelaku Pasar Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Siapa Saja Pelaku Pasar Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari siapa saja pelaku pasar forex?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:51",
            "durationSec": 1371,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep3.mp4"
          },
          {
            "id": "s2_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Bank Sentral dan Pengaruhnya terhadap Forex",
            "storyTitle": "Kekuatan Dewa Langit: Bank Sentral & Pengendalian Badai Bunga",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bank Sentral dan Pengaruhnya terhadap Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bank Sentral dan Pengaruhnya terhadap Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bank sentral dan pengaruhnya terhadap forex",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:08",
            "durationSec": 848,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep4.mp4"
          },
          {
            "id": "s2_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Bank Komersial, Institusi, dan Hedge Fund",
            "storyTitle": "Armada Hedge Fund: Bagaimana Paus Memburu Mangsa di Lautan",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bank Komersial, Institusi, dan Hedge Fund' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bank Komersial, Institusi, dan Hedge Fund dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bank komersial, institusi, dan hedge fund",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:25",
            "durationSec": 1285,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep5.mp4"
          },
          {
            "id": "s2_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Retail Trader: Peran Trader Individu",
            "storyTitle": "Perahu Nelayan Kecil: Peran & Kelemahan Terbesar Retail Trader",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Retail Trader: Peran Trader Individu' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Retail Trader: Peran Trader Individu dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari retail trader: peran trader individu",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:42",
            "durationSec": 822,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep6.mp4"
          },
          {
            "id": "s2_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengapa Pasar Forex Menjadi Pasar Keuangan Global?",
            "storyTitle": "Samudra Tanpa Batas: Mengapa Likuiditas $7.5 Triliun Tak Pernah Kering",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Pasar Forex Menjadi Pasar Keuangan Global?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Pasar Forex Menjadi Pasar Keuangan Global? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa pasar forex menjadi pasar keuangan global?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:59",
            "durationSec": 1259,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep7.mp4"
          },
          {
            "id": "s2_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Pasar Forex 24 Jam: Bagaimana Sistemnya?",
            "storyTitle": "Laut Yang Tak Pernah Tidur: 24 Jam Rotasi Matahari di Pasar Finansial",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Pasar Forex 24 Jam: Bagaimana Sistemnya?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Pasar Forex 24 Jam: Bagaimana Sistemnya? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari pasar forex 24 jam: bagaimana sistemnya?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:16",
            "durationSec": 736,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep8.mp4"
          },
          {
            "id": "s2_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Perbedaan Forex Spot, Forward, Futures, dan CFD",
            "storyTitle": "Peta Jenis Kontrak: Perbedaan Spot, Forward, Futures & CFD",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Forex Spot, Forward, Futures, dan CFD' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Perbedaan Forex Spot, Forward, Futures, dan CFD dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari perbedaan forex spot, forward, futures, dan cfd",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:33",
            "durationSec": 1173,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep9.mp4"
          },
          {
            "id": "s2_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Mitos dan Fakta Seputar Trading Forex",
            "storyTitle": "Membongkar Ilusi Halusinasi: Mitos Cepat Kaya vs Realita Bisnis Disiplin",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mitos dan Fakta Seputar Trading Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mitos dan Fakta Seputar Trading Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mitos dan fakta seputar trading forex",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:50",
            "durationSec": 710,
            "isFree": true,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s2/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 3,
        "title": "SEASON 3 — Mengenal Mata Uang dan Pasangan Trading",
        "rawTitle": "Mengenal Mata Uang dan Pasangan Trading",
        "sagaId": 1,
        "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
        "arcName": "Allied Currencies Arc",
        "tagline": "Aliansi Mata Uang Dunia: Major, Minor, & Logam Emas",
        "description": "Mengenal bendera dari setiap armada mata uang dunia, kekuatan Dolar AS sebagai raja lautan, dan kilau emas XAUUSD.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s3_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Currency Pair?",
            "storyTitle": "Memilih Pasangan Layar: Misteri Currency Pair 2 Arah",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Currency Pair?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Currency Pair? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu currency pair?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:17",
            "durationSec": 677,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep1.mp4"
          },
          {
            "id": "s3_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Base Currency dan Quote Currency",
            "storyTitle": "Dua Sisi Mata Pedang: Memahami Base vs Quote Currency",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Base Currency dan Quote Currency' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Base Currency dan Quote Currency dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari base currency dan quote currency",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:34",
            "durationSec": 1114,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep2.mp4"
          },
          {
            "id": "s3_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Major Currency Pairs",
            "storyTitle": "Tujuh Pendekar Laut: Major Pairs dengan Arus Likuiditas Raksasa",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Major Currency Pairs' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Major Currency Pairs dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari major currency pairs",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:51",
            "durationSec": 651,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep3.mp4"
          },
          {
            "id": "s3_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Minor Currency Pairs",
            "storyTitle": "Jalur Kepulauan Sunyi: Minor Pairs & Peluang Tersembunyi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Minor Currency Pairs' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Minor Currency Pairs dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari minor currency pairs",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:08",
            "durationSec": 1028,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep4.mp4"
          },
          {
            "id": "s3_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Exotic Currency Pairs",
            "storyTitle": "Lautan Badai Liar: Karakteristik Exotic Pairs yang Menjebak",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Exotic Currency Pairs' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Exotic Currency Pairs dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari exotic currency pairs",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:25",
            "durationSec": 1465,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep5.mp4"
          },
          {
            "id": "s3_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Mengenal USD, EUR, GBP, JPY, CHF, AUD, CAD, dan NZD",
            "storyTitle": "Mengenal Raja Karakter: USD, EUR, GBP, JPY, CHF, AUD, CAD, NZD",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal USD, EUR, GBP, JPY, CHF, AUD, CAD, dan NZD' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal USD, EUR, GBP, JPY, CHF, AUD, CAD, dan NZD dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal usd, eur, gbp, jpy, chf, aud, cad, dan nzd",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:42",
            "durationSec": 1002,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep6.mp4"
          },
          {
            "id": "s3_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengapa Dolar AS Sangat Berpengaruh?",
            "storyTitle": "Diktator Perekonomian: Mengapa Dolar AS Mempengaruhi Seluruh Dunia",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Dolar AS Sangat Berpengaruh?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Dolar AS Sangat Berpengaruh? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa dolar as sangat berpengaruh?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:59",
            "durationSec": 1439,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep7.mp4"
          },
          {
            "id": "s3_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Korelasi Antar Pasangan Mata Uang",
            "storyTitle": "Tali Tak Kasat Mata: Korelasi Positif & Negatif Antara Pasangan Uang",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Korelasi Antar Pasangan Mata Uang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Korelasi Antar Pasangan Mata Uang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari korelasi antar pasangan mata uang",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:16",
            "durationSec": 916,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep8.mp4"
          },
          {
            "id": "s3_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Mengenal XAUUSD atau Gold dalam Trading",
            "storyTitle": "Naga Emas XAUUSD: Karakteristik Emas Sang Pelindung Nilai",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal XAUUSD atau Gold dalam Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal XAUUSD atau Gold dalam Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal xauusd atau gold dalam trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:33",
            "durationSec": 1353,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep9.mp4"
          },
          {
            "id": "s3_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Cara Memilih Pair yang Cocok untuk Pemula",
            "storyTitle": "Memilih Kompas Pertama: Rekomendasi Pair Terbaik untuk Pemula",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memilih Pair yang Cocok untuk Pemula' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memilih Pair yang Cocok untuk Pemula dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memilih pair yang cocok untuk pemula",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:50",
            "durationSec": 890,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s3/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 4,
        "title": "SEASON 4 — Memahami Harga dan Istilah Forex",
        "rawTitle": "Memahami Harga dan Istilah Forex",
        "sagaId": 1,
        "sagaTitle": "BAGIAN 1 — SEJARAH DAN DASAR FOREX",
        "arcName": "Sea Terminology Arc",
        "tagline": "Mantra Pelaut: Bid, Ask, Spread, Pip & Pedang Leverage",
        "description": "Memahami dialek baku para pelaut pasar keuangan agar tidak tertipu oleh istilah kalkulasi margin dan biaya menginap swap.",
        "isFree": false,
        "totalDuration": "160 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s4_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Bid dan Ask?",
            "storyTitle": "Harga Pembelian & Penjualan: Memahami Bid dan Ask",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Bid dan Ask?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Bid dan Ask? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu bid dan ask?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:17",
            "durationSec": 857,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep1.mp4"
          },
          {
            "id": "s4_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Apa Itu Spread?",
            "storyTitle": "Pajak Sang Bandar: Rahasia di Balik Spread Broker",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Spread?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Spread? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu spread?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:34",
            "durationSec": 1294,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep2.mp4"
          },
          {
            "id": "s4_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Apa Itu Pip dan Pipette?",
            "storyTitle": "Langkah Kaki Terkecil: Menghitung Pip dan Pipette Tanpa Ragu",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Pip dan Pipette?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Pip dan Pipette? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu pip dan pipette?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:51",
            "durationSec": 831,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep3.mp4"
          },
          {
            "id": "s4_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Apa Itu Point dalam Trading?",
            "storyTitle": "Titik Poin: Perbedaan Pip vs Point dalam Perhitungan Cepat",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Point dalam Trading?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Point dalam Trading? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu point dalam trading?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:08",
            "durationSec": 1208,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep4.mp4"
          },
          {
            "id": "s4_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Mengenal Lot: Standard, Mini, Micro, dan Nano",
            "storyTitle": "Ukuran Muatan Kapal: Standard, Mini, Micro, & Nano Lot",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Lot: Standard, Mini, Micro, dan Nano' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Lot: Standard, Mini, Micro, dan Nano dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal lot: standard, mini, micro, dan nano",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:25",
            "durationSec": 745,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep5.mp4"
          },
          {
            "id": "s4_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Apa Itu Leverage?",
            "storyTitle": "Pedang Bermata Dua: Mengapa Leverage Tinggi Bisa Menenggelamkan Kapal",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Leverage?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Leverage? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu leverage?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:42",
            "durationSec": 1182,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep6.mp4"
          },
          {
            "id": "s4_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Apa Itu Margin?",
            "storyTitle": "Jaminan Pelayaran: Apa Sebenarnya Margin yang Ditahan Broker?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Margin?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Margin? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu margin?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:59",
            "durationSec": 719,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep7.mp4"
          },
          {
            "id": "s4_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengenal Free Margin dan Margin Level",
            "storyTitle": "Zona Bahaya: Menjaga Free Margin & Membaca Margin Level",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Free Margin dan Margin Level' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Free Margin dan Margin Level dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal free margin dan margin level",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:16",
            "durationSec": 1096,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep8.mp4"
          },
          {
            "id": "s4_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Apa Itu Swap dan Komisi?",
            "storyTitle": "Biaya Berlabuh Tengah Malam: Mengupas Swap & Komisi Broker",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Swap dan Komisi?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Swap dan Komisi? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu swap dan komisi?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:33",
            "durationSec": 633,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep9.mp4"
          },
          {
            "id": "s4_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Mengenal Floating Profit, Floating Loss, dan Equity",
            "storyTitle": "Ilusi Cermin: Membedakan Floating Profit, Floating Loss & Equity Bersih",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Floating Profit, Floating Loss, dan Equity' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Floating Profit, Floating Loss, dan Equity dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal floating profit, floating loss, dan equity",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:50",
            "durationSec": 1070,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s4/ep10.mp4"
          }
        ]
      }
    ],
    "totalEpisodes": 40
  },
  {
    "id": 2,
    "sagaNumber": 2,
    "title": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
    "subTitle": "Memilih Kapal Tempur & Menyiapkan Navigasi Kokpit",
    "animeTheme": "Grand Line Entry: Galangan Kapal & Kompas MetaTrader",
    "description": "Memasuki pintu gerbang samudra luas. Membedakan galangan kapal terpercaya dengan sarang bajak laut scammer, serta menguasai setiap tuas kemudi MetaTrader 4 & 5 agar kapal tidak karam oleh arus slippage dan jebakan spread.",
    "seasonRange": "Season 5 - 8",
    "seasonNumbers": [
      5,
      6,
      7,
      8
    ],
    "isFree": false,
    "seasons": [
      {
        "seasonNumber": 5,
        "title": "SEASON 5 — Mengenal Broker dan Infrastruktur Trading",
        "rawTitle": "Mengenal Broker dan Infrastruktur Trading",
        "sagaId": 2,
        "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
        "arcName": "Shipyard & Pirates Arc",
        "tagline": "Galangan Kapal Jujur vs Perompak Scam Ilegal",
        "description": "Panduan memilih broker legal berlisensi resmi, menghindari jebakan janji titip dana fiktif, dan memahami model eksekusi STP/ECN.",
        "isFree": false,
        "totalDuration": "277 Menit",
        "totalEpisodes": 15,
        "episodes": [
          {
            "id": "s5_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Broker Forex?",
            "storyTitle": "Shipyard & Pirates Arc #1: Menaklukkan Apa Itu Broker Forex?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Broker Forex?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Broker Forex? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu broker forex?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:17",
            "durationSec": 1037,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep1.mp4"
          },
          {
            "id": "s5_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Bagaimana Broker Menghasilkan Keuntungan?",
            "storyTitle": "Shipyard & Pirates Arc #2: Menaklukkan Bagaimana Broker Menghasilkan Keuntungan?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Broker Menghasilkan Keuntungan?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bagaimana Broker Menghasilkan Keuntungan? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bagaimana broker menghasilkan keuntungan?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:34",
            "durationSec": 1474,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep2.mp4"
          },
          {
            "id": "s5_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Perbedaan Broker Market Maker dan ECN",
            "storyTitle": "Shipyard & Pirates Arc #3: Menaklukkan Perbedaan Broker Market Maker dan ECN",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Broker Market Maker dan ECN' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Perbedaan Broker Market Maker dan ECN dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari perbedaan broker market maker dan ecn",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:51",
            "durationSec": 1011,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep3.mp4"
          },
          {
            "id": "s5_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal STP, ECN, dan Model Eksekusi Broker",
            "storyTitle": "Shipyard & Pirates Arc #4: Menaklukkan Mengenal STP, ECN, dan Model Eksekusi Broker",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal STP, ECN, dan Model Eksekusi Broker' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal STP, ECN, dan Model Eksekusi Broker dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal stp, ecn, dan model eksekusi broker",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:08",
            "durationSec": 1388,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep4.mp4"
          },
          {
            "id": "s5_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Apa Itu Liquidity Provider?",
            "storyTitle": "Shipyard & Pirates Arc #5: Menaklukkan Apa Itu Liquidity Provider?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Liquidity Provider?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Liquidity Provider? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu liquidity provider?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:25",
            "durationSec": 925,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep5.mp4"
          },
          {
            "id": "s5_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Mengenal Regulasi Broker Forex",
            "storyTitle": "Shipyard & Pirates Arc #6: Menaklukkan Mengenal Regulasi Broker Forex",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Regulasi Broker Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Regulasi Broker Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal regulasi broker forex",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:42",
            "durationSec": 1362,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep6.mp4"
          },
          {
            "id": "s5_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengapa Industri Forex Membutuhkan Regulasi?",
            "storyTitle": "Shipyard & Pirates Arc #7: Menaklukkan Mengapa Industri Forex Membutuhkan Regulasi?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Industri Forex Membutuhkan Regulasi?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Industri Forex Membutuhkan Regulasi? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa industri forex membutuhkan regulasi?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:59",
            "durationSec": 899,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep7.mp4"
          },
          {
            "id": "s5_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional.",
            "storyTitle": "Shipyard & Pirates Arc #8: Menaklukkan Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal FCA, ASIC, CFTC, NFA, dan Regulator Internasional. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal fca, asic, cftc, nfa, dan regulator internasional.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:16",
            "durationSec": 1276,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep8.mp4"
          },
          {
            "id": "s5_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia.",
            "storyTitle": "Shipyard & Pirates Arc #9: Menaklukkan Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Legalitas dan Pengawasan Perdagangan Berjangka di Indonesia. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari legalitas dan pengawasan perdagangan berjangka di indonesia.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:33",
            "durationSec": 813,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep9.mp4"
          },
          {
            "id": "s5_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal.",
            "storyTitle": "Shipyard & Pirates Arc #10: Menaklukkan Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memeriksa Legalitas Broker dan Menghindari Broker Ilegal. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memeriksa legalitas broker dan menghindari broker ilegal.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:50",
            "durationSec": 1250,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep10.mp4"
          },
          {
            "id": "s5_ep11",
            "episodeNumber": 11,
            "title": "Episode 11 — Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap.",
            "storyTitle": "Shipyard & Pirates Arc #11: Menaklukkan Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Scam Forex, Money Management Palsu, dan Bahaya Janji Profit Tetap. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari scam forex, money management palsu, dan bahaya janji profit tetap.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:07",
            "durationSec": 727,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep11.mp4"
          },
          {
            "id": "s5_ep12",
            "episodeNumber": 12,
            "title": "Episode 12 — Cara Memilih Broker yang Aman dan Terpercaya",
            "storyTitle": "Shipyard & Pirates Arc #12: Menaklukkan Cara Memilih Broker yang Aman dan Terpercaya",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memilih Broker yang Aman dan Terpercaya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memilih Broker yang Aman dan Terpercaya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memilih broker yang aman dan terpercaya",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:24",
            "durationSec": 1164,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep12.mp4"
          },
          {
            "id": "s5_ep18",
            "episodeNumber": 18,
            "title": "Episode 18 — Perbedaan Akun Standard, Cent, Raw, dan Pro",
            "storyTitle": "Shipyard & Pirates Arc #18: Menaklukkan Perbedaan Akun Standard, Cent, Raw, dan Pro",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Akun Standard, Cent, Raw, dan Pro' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Perbedaan Akun Standard, Cent, Raw, dan Pro dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari perbedaan akun standard, cent, raw, dan pro",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:06",
            "durationSec": 966,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep18.mp4"
          },
          {
            "id": "s5_ep19",
            "episodeNumber": 19,
            "title": "Episode 19 — Demo Account vs Real Account",
            "storyTitle": "Shipyard & Pirates Arc #19: Menaklukkan Demo Account vs Real Account",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Demo Account vs Real Account' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Demo Account vs Real Account dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari demo account vs real account",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:23",
            "durationSec": 1403,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep19.mp4"
          },
          {
            "id": "s5_ep20",
            "episodeNumber": 20,
            "title": "Episode 20 — Kesalahan Pemula Saat Memilih Broker",
            "storyTitle": "Shipyard & Pirates Arc #20: Menaklukkan Kesalahan Pemula Saat Memilih Broker",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Kesalahan Pemula Saat Memilih Broker' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Kesalahan Pemula Saat Memilih Broker dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari kesalahan pemula saat memilih broker",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:40",
            "durationSec": 940,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s5/ep20.mp4"
          }
        ]
      },
      {
        "seasonNumber": 6,
        "title": "SEASON 6 — MetaQuotes: Sejarah, Teknologi, dan Ekosistem MetaTrader",
        "rawTitle": "MetaQuotes: Sejarah, Teknologi, dan Ekosistem MetaTrader",
        "sagaId": 2,
        "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
        "arcName": "Cockpit of MetaQuotes Arc",
        "tagline": "Arsitektur Mesin Tempur: Ekosistem MetaTrader",
        "description": "Bedah tuntas software trading paling legendaris di dunia yang menghubungkan komputer kita langsung ke bursa likuiditas internasional.",
        "isFree": false,
        "totalDuration": "190 Menit",
        "totalEpisodes": 11,
        "episodes": [
          {
            "id": "s6_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Mengenal Platform Trading MetaTrader",
            "storyTitle": "Cockpit of MetaQuotes Arc #1: Menaklukkan Mengenal Platform Trading MetaTrader",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Platform Trading MetaTrader' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Platform Trading MetaTrader dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal platform trading metatrader",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:17",
            "durationSec": 1217,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep1.mp4"
          },
          {
            "id": "s6_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Cara Membuat dan Menghubungkan Akun Trading",
            "storyTitle": "Cockpit of MetaQuotes Arc #2: Menaklukkan Cara Membuat dan Menghubungkan Akun Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat dan Menghubungkan Akun Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuat dan Menghubungkan Akun Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuat dan menghubungkan akun trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:34",
            "durationSec": 754,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep2.mp4"
          },
          {
            "id": "s6_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mengenal Market Watch dan Daftar Pair",
            "storyTitle": "Cockpit of MetaQuotes Arc #3: Menaklukkan Mengenal Market Watch dan Daftar Pair",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Market Watch dan Daftar Pair' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Market Watch dan Daftar Pair dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal market watch dan daftar pair",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:51",
            "durationSec": 1191,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep3.mp4"
          },
          {
            "id": "s6_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal Chart dan Candlestick",
            "storyTitle": "Cockpit of MetaQuotes Arc #4: Menaklukkan Mengenal Chart dan Candlestick",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Chart dan Candlestick' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Chart dan Candlestick dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal chart dan candlestick",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:08",
            "durationSec": 668,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep4.mp4"
          },
          {
            "id": "s6_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Cara Mengatur Timeframe dan Tampilan Chart",
            "storyTitle": "Cockpit of MetaQuotes Arc #5: Menaklukkan Cara Mengatur Timeframe dan Tampilan Chart",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengatur Timeframe dan Tampilan Chart' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Mengatur Timeframe dan Tampilan Chart dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara mengatur timeframe dan tampilan chart",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:25",
            "durationSec": 1105,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep5.mp4"
          },
          {
            "id": "s6_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Cara Membuka Posisi Buy dan Sell",
            "storyTitle": "Cockpit of MetaQuotes Arc #6: Menaklukkan Cara Membuka Posisi Buy dan Sell",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuka Posisi Buy dan Sell' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuka Posisi Buy dan Sell dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuka posisi buy dan sell",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:42",
            "durationSec": 642,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep6.mp4"
          },
          {
            "id": "s6_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Cara Memasang Stop Loss dan Take Profit",
            "storyTitle": "Cockpit of MetaQuotes Arc #7: Menaklukkan Cara Memasang Stop Loss dan Take Profit",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Stop Loss dan Take Profit' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memasang Stop Loss dan Take Profit dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memasang stop loss dan take profit",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:59",
            "durationSec": 1079,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep7.mp4"
          },
          {
            "id": "s6_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Cara Memasang Pending Order",
            "storyTitle": "Cockpit of MetaQuotes Arc #8: Menaklukkan Cara Memasang Pending Order",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Pending Order' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memasang Pending Order dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memasang pending order",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:16",
            "durationSec": 1456,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep8.mp4"
          },
          {
            "id": "s6_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Cara Mengubah dan Menutup Posisi Trading",
            "storyTitle": "Cockpit of MetaQuotes Arc #9: Menaklukkan Cara Mengubah dan Menutup Posisi Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengubah dan Menutup Posisi Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Mengubah dan Menutup Posisi Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara mengubah dan menutup posisi trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:33",
            "durationSec": 993,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep9.mp4"
          },
          {
            "id": "s6_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Slippage, Requote, Spread Melebar, dan Risiko Eksekusi.",
            "storyTitle": "Cockpit of MetaQuotes Arc #10: Menaklukkan Slippage, Requote, Spread Melebar, dan Risiko Eksekusi.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Slippage, Requote, Spread Melebar, dan Risiko Eksekusi.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Slippage, Requote, Spread Melebar, dan Risiko Eksekusi. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari slippage, requote, spread melebar, dan risiko eksekusi.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:50",
            "durationSec": 1430,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep10.mp4"
          },
          {
            "id": "s6_ep11",
            "episodeNumber": 11,
            "title": "Episode 11 — Membaca Riwayat Transaksi dan Laporan Trading",
            "storyTitle": "Cockpit of MetaQuotes Arc #11: Menaklukkan Membaca Riwayat Transaksi dan Laporan Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membaca Riwayat Transaksi dan Laporan Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membaca Riwayat Transaksi dan Laporan Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membaca riwayat transaksi dan laporan trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:07",
            "durationSec": 907,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s6/ep11.mp4"
          }
        ]
      },
      {
        "seasonNumber": 7,
        "title": "SEASON 7 — Menguasai MetaTrader 4 dan MetaTrader 5",
        "rawTitle": "Menguasai MetaTrader 4 dan MetaTrader 5",
        "sagaId": 2,
        "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
        "arcName": "Mastering the Helm Arc",
        "tagline": "Manual Kemudi MT4 & MT5 Tanpa Ragu",
        "description": "Latihan praktis menekan order Buy, Sell, pasang jaring pengaman Stop Loss, Take Profit, hingga membaca riwayat transaksi secara objektif.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s7_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Mengenal Platform Trading MetaTrader",
            "storyTitle": "Mastering the Helm Arc #1: Menaklukkan Mengenal Platform Trading MetaTrader",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Platform Trading MetaTrader' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Platform Trading MetaTrader dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal platform trading metatrader",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:17",
            "durationSec": 1397,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep1.mp4"
          },
          {
            "id": "s7_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Cara Membuat dan Menghubungkan Akun Trading",
            "storyTitle": "Mastering the Helm Arc #2: Menaklukkan Cara Membuat dan Menghubungkan Akun Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat dan Menghubungkan Akun Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuat dan Menghubungkan Akun Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuat dan menghubungkan akun trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:34",
            "durationSec": 934,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep2.mp4"
          },
          {
            "id": "s7_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mengenal Market Watch dan Daftar Pair",
            "storyTitle": "Mastering the Helm Arc #3: Menaklukkan Mengenal Market Watch dan Daftar Pair",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Market Watch dan Daftar Pair' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Market Watch dan Daftar Pair dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal market watch dan daftar pair",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:51",
            "durationSec": 1371,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep3.mp4"
          },
          {
            "id": "s7_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal Chart dan Candlestick",
            "storyTitle": "Mastering the Helm Arc #4: Menaklukkan Mengenal Chart dan Candlestick",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Chart dan Candlestick' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Chart dan Candlestick dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal chart dan candlestick",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:08",
            "durationSec": 848,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep4.mp4"
          },
          {
            "id": "s7_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Cara Mengatur Timeframe dan Tampilan Chart",
            "storyTitle": "Mastering the Helm Arc #5: Menaklukkan Cara Mengatur Timeframe dan Tampilan Chart",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengatur Timeframe dan Tampilan Chart' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Mengatur Timeframe dan Tampilan Chart dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara mengatur timeframe dan tampilan chart",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:25",
            "durationSec": 1285,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep5.mp4"
          },
          {
            "id": "s7_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Cara Membuka Posisi Buy dan Sell",
            "storyTitle": "Mastering the Helm Arc #6: Menaklukkan Cara Membuka Posisi Buy dan Sell",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuka Posisi Buy dan Sell' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuka Posisi Buy dan Sell dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuka posisi buy dan sell",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:42",
            "durationSec": 822,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep6.mp4"
          },
          {
            "id": "s7_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Cara Memasang Stop Loss dan Take Profit",
            "storyTitle": "Mastering the Helm Arc #7: Menaklukkan Cara Memasang Stop Loss dan Take Profit",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Stop Loss dan Take Profit' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memasang Stop Loss dan Take Profit dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memasang stop loss dan take profit",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:59",
            "durationSec": 1259,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep7.mp4"
          },
          {
            "id": "s7_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Cara Memasang Pending Order",
            "storyTitle": "Mastering the Helm Arc #8: Menaklukkan Cara Memasang Pending Order",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Memasang Pending Order' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Memasang Pending Order dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara memasang pending order",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:16",
            "durationSec": 736,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep8.mp4"
          },
          {
            "id": "s7_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Cara Mengubah dan Menutup Posisi Trading",
            "storyTitle": "Mastering the Helm Arc #9: Menaklukkan Cara Mengubah dan Menutup Posisi Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengubah dan Menutup Posisi Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Mengubah dan Menutup Posisi Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara mengubah dan menutup posisi trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:33",
            "durationSec": 1173,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep9.mp4"
          },
          {
            "id": "s7_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Membaca Riwayat Transaksi dan Laporan Trading",
            "storyTitle": "Mastering the Helm Arc #10: Menaklukkan Membaca Riwayat Transaksi dan Laporan Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membaca Riwayat Transaksi dan Laporan Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membaca Riwayat Transaksi dan Laporan Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membaca riwayat transaksi dan laporan trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:50",
            "durationSec": 710,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s7/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 8,
        "title": "SEASON 8 — Memahami Mekanisme Transaksi dan Pergerakan Harga",
        "rawTitle": "Memahami Mekanisme Transaksi dan Pergerakan Harga",
        "sagaId": 2,
        "sagaTitle": "BAGIAN 2 — BROKER DAN TEKNOLOGI TRADING",
        "arcName": "Undercurrent Mechanics Arc",
        "tagline": "Arus Bawah Laut: Cara Harga Bergerak & Bahaya Stop Out",
        "description": "Mengapa candle melonjak naik dan menukik tajam? Menghitung nilai pip presisi dan memahami kenapa broker mengeksekusi Margin Call.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s8_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Bagaimana Harga Forex Bergerak?",
            "storyTitle": "Undercurrent Mechanics Arc #1: Menaklukkan Bagaimana Harga Forex Bergerak?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Harga Forex Bergerak?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bagaimana Harga Forex Bergerak? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bagaimana harga forex bergerak?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:17",
            "durationSec": 677,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep1.mp4"
          },
          {
            "id": "s8_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengapa Harga Bisa Naik dan Turun?",
            "storyTitle": "Undercurrent Mechanics Arc #2: Menaklukkan Mengapa Harga Bisa Naik dan Turun?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Harga Bisa Naik dan Turun?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Harga Bisa Naik dan Turun? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa harga bisa naik dan turun?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:34",
            "durationSec": 1114,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep2.mp4"
          },
          {
            "id": "s8_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga",
            "storyTitle": "Undercurrent Mechanics Arc #3: Menaklukkan Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mekanisme Buy: Mengambil Keuntungan dari Kenaikan Harga dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mekanisme buy: mengambil keuntungan dari kenaikan harga",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:51",
            "durationSec": 651,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep3.mp4"
          },
          {
            "id": "s8_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga",
            "storyTitle": "Undercurrent Mechanics Arc #4: Menaklukkan Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mekanisme Sell: Mengambil Keuntungan dari Penurunan Harga dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mekanisme sell: mengambil keuntungan dari penurunan harga",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:08",
            "durationSec": 1028,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep4.mp4"
          },
          {
            "id": "s8_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Cara Menghitung Profit dan Loss",
            "storyTitle": "Undercurrent Mechanics Arc #5: Menaklukkan Cara Menghitung Profit dan Loss",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menghitung Profit dan Loss' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menghitung Profit dan Loss dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menghitung profit dan loss",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:25",
            "durationSec": 1465,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep5.mp4"
          },
          {
            "id": "s8_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Cara Menghitung Nilai Pip Berdasarkan Lot",
            "storyTitle": "Undercurrent Mechanics Arc #6: Menaklukkan Cara Menghitung Nilai Pip Berdasarkan Lot",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menghitung Nilai Pip Berdasarkan Lot' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menghitung Nilai Pip Berdasarkan Lot dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menghitung nilai pip berdasarkan lot",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:42",
            "durationSec": 1002,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep6.mp4"
          },
          {
            "id": "s8_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Memahami Slippage dan Requote",
            "storyTitle": "Undercurrent Mechanics Arc #7: Menaklukkan Memahami Slippage dan Requote",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Slippage dan Requote' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Memahami Slippage dan Requote dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari memahami slippage dan requote",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:59",
            "durationSec": 1439,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep7.mp4"
          },
          {
            "id": "s8_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Market Execution vs Pending Execution",
            "storyTitle": "Undercurrent Mechanics Arc #8: Menaklukkan Market Execution vs Pending Execution",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Market Execution vs Pending Execution' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Market Execution vs Pending Execution dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari market execution vs pending execution",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:16",
            "durationSec": 916,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep8.mp4"
          },
          {
            "id": "s8_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Stop Out dan Margin Call",
            "storyTitle": "Undercurrent Mechanics Arc #9: Menaklukkan Stop Out dan Margin Call",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Stop Out dan Margin Call' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Stop Out dan Margin Call dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari stop out dan margin call",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:33",
            "durationSec": 1353,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep9.mp4"
          },
          {
            "id": "s8_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Simulasi Transaksi Forex dari Awal hingga Selesai",
            "storyTitle": "Undercurrent Mechanics Arc #10: Menaklukkan Simulasi Transaksi Forex dari Awal hingga Selesai",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Simulasi Transaksi Forex dari Awal hingga Selesai' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Simulasi Transaksi Forex dari Awal hingga Selesai dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari simulasi transaksi forex dari awal hingga selesai",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:50",
            "durationSec": 890,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s8/ep10.mp4"
          }
        ]
      }
    ],
    "totalEpisodes": 46
  },
  {
    "id": 3,
    "sagaNumber": 3,
    "title": "BAGIAN 3 — ILMU ANALISIS PASAR",
    "subTitle": "Membaca Sandi Ombak, Arah Angin & Deteksi Badai",
    "animeTheme": "Alabasta & Skypiea Saga: Observasi Haki & Peta Cuaca Pasar",
    "description": "Melatih kepekaan membaca bahasa rahasia candlestick, memetakan benteng Support/Resistance, memahami pergerakan Smart Money (BOS, CHOCH, FVG), serta menaklukkan badai monster berita NFP dan CPI.",
    "seasonRange": "Season 9 - 14",
    "seasonNumbers": [
      9,
      10,
      11,
      12,
      13,
      14
    ],
    "isFree": false,
    "seasons": [
      {
        "seasonNumber": 9,
        "title": "SEASON 9 — Dasar-Dasar Analisis Teknikal",
        "rawTitle": "Dasar-Dasar Analisis Teknikal",
        "sagaId": 3,
        "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
        "arcName": "Stargazing Compass Arc",
        "tagline": "Mata Batin Grafik: Candlestick, Trendline & Key Levels",
        "description": "Melihat kejujuran harga telanjang tanpa tertutup ratusan indikator yang membingungkan. Mengenali benteng Support dan Resistance sejati.",
        "isFree": false,
        "totalDuration": "160 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s9_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Analisis Teknikal?",
            "storyTitle": "Stargazing Compass Arc #1: Menaklukkan Apa Itu Analisis Teknikal?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Analisis Teknikal?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Analisis Teknikal? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu analisis teknikal?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:17",
            "durationSec": 857,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep1.mp4"
          },
          {
            "id": "s9_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengenal Candlestick dan Cara Membacanya",
            "storyTitle": "Stargazing Compass Arc #2: Menaklukkan Mengenal Candlestick dan Cara Membacanya",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Candlestick dan Cara Membacanya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Candlestick dan Cara Membacanya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal candlestick dan cara membacanya",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:34",
            "durationSec": 1294,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep2.mp4"
          },
          {
            "id": "s9_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Memahami Timeframe M1, M5, M15, dan M30",
            "storyTitle": "Stargazing Compass Arc #3: Menaklukkan Memahami Timeframe M1, M5, M15, dan M30",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Timeframe M1, M5, M15, dan M30' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Memahami Timeframe M1, M5, M15, dan M30 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari memahami timeframe m1, m5, m15, dan m30",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:51",
            "durationSec": 831,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep3.mp4"
          },
          {
            "id": "s9_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Memahami Timeframe H1, H4, D1, dan W1",
            "storyTitle": "Stargazing Compass Arc #4: Menaklukkan Memahami Timeframe H1, H4, D1, dan W1",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Timeframe H1, H4, D1, dan W1' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Memahami Timeframe H1, H4, D1, dan W1 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari memahami timeframe h1, h4, d1, dan w1",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:08",
            "durationSec": 1208,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep4.mp4"
          },
          {
            "id": "s9_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Mengenal Struktur Market",
            "storyTitle": "Stargazing Compass Arc #5: Menaklukkan Mengenal Struktur Market",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Struktur Market' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Struktur Market dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal struktur market",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:25",
            "durationSec": 745,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep5.mp4"
          },
          {
            "id": "s9_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Apa Itu Uptrend, Downtrend, dan Sideways?",
            "storyTitle": "Stargazing Compass Arc #6: Menaklukkan Apa Itu Uptrend, Downtrend, dan Sideways?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Uptrend, Downtrend, dan Sideways?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Uptrend, Downtrend, dan Sideways? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu uptrend, downtrend, dan sideways?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:42",
            "durationSec": 1182,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep6.mp4"
          },
          {
            "id": "s9_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal Support dan Resistance",
            "storyTitle": "Stargazing Compass Arc #7: Menaklukkan Mengenal Support dan Resistance",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Support dan Resistance' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Support dan Resistance dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal support dan resistance",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:59",
            "durationSec": 719,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep7.mp4"
          },
          {
            "id": "s9_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Cara Menggambar Trendline",
            "storyTitle": "Stargazing Compass Arc #8: Menaklukkan Cara Menggambar Trendline",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menggambar Trendline' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menggambar Trendline dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menggambar trendline",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:16",
            "durationSec": 1096,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep8.mp4"
          },
          {
            "id": "s9_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Mengenal Area Supply dan Demand",
            "storyTitle": "Stargazing Compass Arc #9: Menaklukkan Mengenal Area Supply dan Demand",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Area Supply dan Demand' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Area Supply dan Demand dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal area supply dan demand",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:33",
            "durationSec": 633,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep9.mp4"
          },
          {
            "id": "s9_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Praktik Membaca Chart Tanpa Indikator",
            "storyTitle": "Stargazing Compass Arc #10: Menaklukkan Praktik Membaca Chart Tanpa Indikator",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Praktik Membaca Chart Tanpa Indikator' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Praktik Membaca Chart Tanpa Indikator dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari praktik membaca chart tanpa indikator",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:50",
            "durationSec": 1070,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s9/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 10,
        "title": "SEASON 10 — Menguasai Candlestick Pattern",
        "rawTitle": "Menguasai Candlestick Pattern",
        "sagaId": 3,
        "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
        "arcName": "Candlestick Runes Arc",
        "tagline": "Bahasa Sandi Lilin Jepang: Pinbar, Engulfing & Doji",
        "description": "Warisan rahasia pedagang beras Jepang abad ke-18 untuk mendeteksi pertarungan berdarah antara pembeli dan penjual di zona kritis.",
        "isFree": false,
        "totalDuration": "190 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s10_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Sejarah dan Fungsi Candlestick dalam Trading",
            "storyTitle": "Candlestick Runes Arc #1: Menaklukkan Sejarah dan Fungsi Candlestick dalam Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah dan Fungsi Candlestick dalam Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sejarah dan Fungsi Candlestick dalam Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sejarah dan fungsi candlestick dalam trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:17",
            "durationSec": 1037,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep1.mp4"
          },
          {
            "id": "s10_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengenal Doji Candle",
            "storyTitle": "Candlestick Runes Arc #2: Menaklukkan Mengenal Doji Candle",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Doji Candle' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Doji Candle dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal doji candle",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:34",
            "durationSec": 1474,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep2.mp4"
          },
          {
            "id": "s10_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mengenal Hammer dan Inverted Hammer",
            "storyTitle": "Candlestick Runes Arc #3: Menaklukkan Mengenal Hammer dan Inverted Hammer",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Hammer dan Inverted Hammer' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Hammer dan Inverted Hammer dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal hammer dan inverted hammer",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:51",
            "durationSec": 1011,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep3.mp4"
          },
          {
            "id": "s10_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal Shooting Star dan Hanging Man",
            "storyTitle": "Candlestick Runes Arc #4: Menaklukkan Mengenal Shooting Star dan Hanging Man",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Shooting Star dan Hanging Man' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Shooting Star dan Hanging Man dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal shooting star dan hanging man",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:08",
            "durationSec": 1388,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep4.mp4"
          },
          {
            "id": "s10_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Mengenal Bullish Engulfing",
            "storyTitle": "Candlestick Runes Arc #5: Menaklukkan Mengenal Bullish Engulfing",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Bullish Engulfing' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Bullish Engulfing dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal bullish engulfing",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:25",
            "durationSec": 925,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep5.mp4"
          },
          {
            "id": "s10_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Mengenal Bearish Engulfing",
            "storyTitle": "Candlestick Runes Arc #6: Menaklukkan Mengenal Bearish Engulfing",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Bearish Engulfing' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Bearish Engulfing dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal bearish engulfing",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:42",
            "durationSec": 1362,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep6.mp4"
          },
          {
            "id": "s10_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal Morning Star dan Evening Star",
            "storyTitle": "Candlestick Runes Arc #7: Menaklukkan Mengenal Morning Star dan Evening Star",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Morning Star dan Evening Star' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Morning Star dan Evening Star dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal morning star dan evening star",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:59",
            "durationSec": 899,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep7.mp4"
          },
          {
            "id": "s10_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengenal Pin Bar dan Rejection Candle",
            "storyTitle": "Candlestick Runes Arc #8: Menaklukkan Mengenal Pin Bar dan Rejection Candle",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Pin Bar dan Rejection Candle' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Pin Bar dan Rejection Candle dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal pin bar dan rejection candle",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:16",
            "durationSec": 1276,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep8.mp4"
          },
          {
            "id": "s10_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Mengenal Inside Bar dan Outside Bar",
            "storyTitle": "Candlestick Runes Arc #9: Menaklukkan Mengenal Inside Bar dan Outside Bar",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Inside Bar dan Outside Bar' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Inside Bar dan Outside Bar dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal inside bar dan outside bar",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:33",
            "durationSec": 813,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep9.mp4"
          },
          {
            "id": "s10_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Menggabungkan Candlestick dengan Support dan Resistance",
            "storyTitle": "Candlestick Runes Arc #10: Menaklukkan Menggabungkan Candlestick dengan Support dan Resistance",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Menggabungkan Candlestick dengan Support dan Resistance' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Menggabungkan Candlestick dengan Support dan Resistance dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari menggabungkan candlestick dengan support dan resistance",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:50",
            "durationSec": 1250,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s10/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 11,
        "title": "SEASON 11 — Indikator Teknikal untuk Trader",
        "rawTitle": "Indikator Teknikal untuk Trader",
        "sagaId": 3,
        "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
        "arcName": "Navigational Tools Arc",
        "tagline": "Kacamata Pelaut: Moving Average, RSI, MACD & Fibonacci",
        "description": "Memanfaatkan indikator matematika sebagai alat konfirmasi pelengkap, bukan sebagai bola kristal peramal masa depan.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s11_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Indikator Teknikal?",
            "storyTitle": "Navigational Tools Arc #1: Menaklukkan Apa Itu Indikator Teknikal?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Indikator Teknikal?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Indikator Teknikal? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu indikator teknikal?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:17",
            "durationSec": 1217,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep1.mp4"
          },
          {
            "id": "s11_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengenal Moving Average (MA)",
            "storyTitle": "Navigational Tools Arc #2: Menaklukkan Mengenal Moving Average (MA)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Moving Average (MA)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Moving Average (MA) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal moving average (ma)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:34",
            "durationSec": 754,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep2.mp4"
          },
          {
            "id": "s11_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mengenal Exponential Moving Average (EMA)",
            "storyTitle": "Navigational Tools Arc #3: Menaklukkan Mengenal Exponential Moving Average (EMA)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Exponential Moving Average (EMA)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Exponential Moving Average (EMA) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal exponential moving average (ema)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:51",
            "durationSec": 1191,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep3.mp4"
          },
          {
            "id": "s11_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal Relative Strength Index (RSI)",
            "storyTitle": "Navigational Tools Arc #4: Menaklukkan Mengenal Relative Strength Index (RSI)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Relative Strength Index (RSI)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Relative Strength Index (RSI) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal relative strength index (rsi)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:08",
            "durationSec": 668,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep4.mp4"
          },
          {
            "id": "s11_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Mengenal Moving Average Convergence Divergence (MACD)",
            "storyTitle": "Navigational Tools Arc #5: Menaklukkan Mengenal Moving Average Convergence Divergence (MACD)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Moving Average Convergence Divergence (MACD)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Moving Average Convergence Divergence (MACD) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal moving average convergence divergence (macd)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:25",
            "durationSec": 1105,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep5.mp4"
          },
          {
            "id": "s11_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Mengenal Bollinger Bands",
            "storyTitle": "Navigational Tools Arc #6: Menaklukkan Mengenal Bollinger Bands",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Bollinger Bands' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Bollinger Bands dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal bollinger bands",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:42",
            "durationSec": 642,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep6.mp4"
          },
          {
            "id": "s11_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal Stochastic Oscillator",
            "storyTitle": "Navigational Tools Arc #7: Menaklukkan Mengenal Stochastic Oscillator",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Stochastic Oscillator' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Stochastic Oscillator dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal stochastic oscillator",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:59",
            "durationSec": 1079,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep7.mp4"
          },
          {
            "id": "s11_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengenal Average True Range (ATR)",
            "storyTitle": "Navigational Tools Arc #8: Menaklukkan Mengenal Average True Range (ATR)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Average True Range (ATR)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Average True Range (ATR) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal average true range (atr)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:16",
            "durationSec": 1456,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep8.mp4"
          },
          {
            "id": "s11_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Mengenal Fibonacci Retracement",
            "storyTitle": "Navigational Tools Arc #9: Menaklukkan Mengenal Fibonacci Retracement",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Fibonacci Retracement' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Fibonacci Retracement dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal fibonacci retracement",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:33",
            "durationSec": 993,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep9.mp4"
          },
          {
            "id": "s11_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Cara Menggabungkan Indikator Tanpa Overload Chart",
            "storyTitle": "Navigational Tools Arc #10: Menaklukkan Cara Menggabungkan Indikator Tanpa Overload Chart",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menggabungkan Indikator Tanpa Overload Chart' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menggabungkan Indikator Tanpa Overload Chart dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menggabungkan indikator tanpa overload chart",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:50",
            "durationSec": 1430,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s11/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 12,
        "title": "SEASON 12 — Price Action dan Market Structure",
        "rawTitle": "Price Action dan Market Structure",
        "sagaId": 3,
        "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
        "arcName": "Observation Haki Arc",
        "tagline": "Jejak Langkah Smart Money: BOS, CHOCH, FVG & Liquidity Sweep",
        "description": "Melihat jebakan para paus pasar yang memburu stop loss trader ritel, dan belajar berlayar mengikuti arus gelombang besar institusi.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s12_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Price Action?",
            "storyTitle": "Observation Haki Arc #1: Menaklukkan Apa Itu Price Action?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Price Action?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Price Action? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu price action?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:17",
            "durationSec": 1397,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep1.mp4"
          },
          {
            "id": "s12_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengenal Swing High dan Swing Low",
            "storyTitle": "Observation Haki Arc #2: Menaklukkan Mengenal Swing High dan Swing Low",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Swing High dan Swing Low' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Swing High dan Swing Low dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal swing high dan swing low",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:34",
            "durationSec": 934,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep2.mp4"
          },
          {
            "id": "s12_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Break of Structure (BOS)",
            "storyTitle": "Observation Haki Arc #3: Menaklukkan Break of Structure (BOS)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Break of Structure (BOS)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Break of Structure (BOS) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari break of structure (bos)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:51",
            "durationSec": 1371,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep3.mp4"
          },
          {
            "id": "s12_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Change of Character (CHOCH)",
            "storyTitle": "Observation Haki Arc #4: Menaklukkan Change of Character (CHOCH)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Change of Character (CHOCH)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Change of Character (CHOCH) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari change of character (choch)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:08",
            "durationSec": 848,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep4.mp4"
          },
          {
            "id": "s12_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Market Structure Shift (MSS)",
            "storyTitle": "Observation Haki Arc #5: Menaklukkan Market Structure Shift (MSS)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Market Structure Shift (MSS)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Market Structure Shift (MSS) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari market structure shift (mss)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:25",
            "durationSec": 1285,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep5.mp4"
          },
          {
            "id": "s12_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Mengenal Liquidity dalam Trading",
            "storyTitle": "Observation Haki Arc #6: Menaklukkan Mengenal Liquidity dalam Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Liquidity dalam Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Liquidity dalam Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal liquidity dalam trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:42",
            "durationSec": 822,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep6.mp4"
          },
          {
            "id": "s12_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Buy Side Liquidity dan Sell Side Liquidity",
            "storyTitle": "Observation Haki Arc #7: Menaklukkan Buy Side Liquidity dan Sell Side Liquidity",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Buy Side Liquidity dan Sell Side Liquidity' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Buy Side Liquidity dan Sell Side Liquidity dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari buy side liquidity dan sell side liquidity",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:59",
            "durationSec": 1259,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep7.mp4"
          },
          {
            "id": "s12_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Liquidity Sweep dan Stop Hunt",
            "storyTitle": "Observation Haki Arc #8: Menaklukkan Liquidity Sweep dan Stop Hunt",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Liquidity Sweep dan Stop Hunt' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Liquidity Sweep dan Stop Hunt dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari liquidity sweep dan stop hunt",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:16",
            "durationSec": 736,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep8.mp4"
          },
          {
            "id": "s12_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Order Block dan Fair Value Gap (FVG)",
            "storyTitle": "Observation Haki Arc #9: Menaklukkan Order Block dan Fair Value Gap (FVG)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Order Block dan Fair Value Gap (FVG)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Order Block dan Fair Value Gap (FVG) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari order block dan fair value gap (fvg)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:33",
            "durationSec": 1173,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep9.mp4"
          },
          {
            "id": "s12_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Praktik Membaca Market Structure dari H1 ke M5",
            "storyTitle": "Observation Haki Arc #10: Menaklukkan Praktik Membaca Market Structure dari H1 ke M5",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Praktik Membaca Market Structure dari H1 ke M5' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Praktik Membaca Market Structure dari H1 ke M5 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari praktik membaca market structure dari h1 ke m5",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:50",
            "durationSec": 710,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s12/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 13,
        "title": "SEASON 13 — Analisis Fundamental dan Berita Ekonomi",
        "rawTitle": "Analisis Fundamental dan Berita Ekonomi",
        "sagaId": 3,
        "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
        "arcName": "Economic Storm Arc",
        "tagline": "Menghadapi Topan Berita: CPI, NFP & Kebijakan Suku Bunga",
        "description": "Bagaimana sebuah pidato gubernur The Fed di Washington dapat mengguncang gelombang ratusan pips dalam hitungan detik.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s13_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Analisis Fundamental?",
            "storyTitle": "Economic Storm Arc #1: Menaklukkan Apa Itu Analisis Fundamental?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Analisis Fundamental?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Analisis Fundamental? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu analisis fundamental?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:17",
            "durationSec": 677,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep1.mp4"
          },
          {
            "id": "s13_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengenal Kalender Ekonomi",
            "storyTitle": "Economic Storm Arc #2: Menaklukkan Mengenal Kalender Ekonomi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Kalender Ekonomi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Kalender Ekonomi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal kalender ekonomi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:34",
            "durationSec": 1114,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep2.mp4"
          },
          {
            "id": "s13_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Apa Itu Inflasi dan CPI?",
            "storyTitle": "Economic Storm Arc #3: Menaklukkan Apa Itu Inflasi dan CPI?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Inflasi dan CPI?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Inflasi dan CPI? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu inflasi dan cpi?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:51",
            "durationSec": 651,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep3.mp4"
          },
          {
            "id": "s13_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal Suku Bunga dan Kebijakan Bank Sentral",
            "storyTitle": "Economic Storm Arc #4: Menaklukkan Mengenal Suku Bunga dan Kebijakan Bank Sentral",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Suku Bunga dan Kebijakan Bank Sentral' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Suku Bunga dan Kebijakan Bank Sentral dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal suku bunga dan kebijakan bank sentral",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:08",
            "durationSec": 1028,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep4.mp4"
          },
          {
            "id": "s13_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Mengenal Federal Reserve dan Kebijakan The Fed",
            "storyTitle": "Economic Storm Arc #5: Menaklukkan Mengenal Federal Reserve dan Kebijakan The Fed",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Federal Reserve dan Kebijakan The Fed' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Federal Reserve dan Kebijakan The Fed dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal federal reserve dan kebijakan the fed",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:25",
            "durationSec": 1465,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep5.mp4"
          },
          {
            "id": "s13_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Apa Itu Non-Farm Payroll (NFP)?",
            "storyTitle": "Economic Storm Arc #6: Menaklukkan Apa Itu Non-Farm Payroll (NFP)?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Non-Farm Payroll (NFP)?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Non-Farm Payroll (NFP)? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu non-farm payroll (nfp)?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:42",
            "durationSec": 1002,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep6.mp4"
          },
          {
            "id": "s13_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal GDP dan Pertumbuhan Ekonomi",
            "storyTitle": "Economic Storm Arc #7: Menaklukkan Mengenal GDP dan Pertumbuhan Ekonomi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal GDP dan Pertumbuhan Ekonomi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal GDP dan Pertumbuhan Ekonomi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal gdp dan pertumbuhan ekonomi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:59",
            "durationSec": 1439,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep7.mp4"
          },
          {
            "id": "s13_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengenal Unemployment Rate dan Data Ketenagakerjaan",
            "storyTitle": "Economic Storm Arc #8: Menaklukkan Mengenal Unemployment Rate dan Data Ketenagakerjaan",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Unemployment Rate dan Data Ketenagakerjaan' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Unemployment Rate dan Data Ketenagakerjaan dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal unemployment rate dan data ketenagakerjaan",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:16",
            "durationSec": 916,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep8.mp4"
          },
          {
            "id": "s13_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Pengaruh Perang, Politik, dan Geopolitik terhadap Forex",
            "storyTitle": "Economic Storm Arc #9: Menaklukkan Pengaruh Perang, Politik, dan Geopolitik terhadap Forex",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Pengaruh Perang, Politik, dan Geopolitik terhadap Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Pengaruh Perang, Politik, dan Geopolitik terhadap Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari pengaruh perang, politik, dan geopolitik terhadap forex",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:33",
            "durationSec": 1353,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep9.mp4"
          },
          {
            "id": "s13_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Cara Membaca Berita untuk Menentukan Risiko Trading",
            "storyTitle": "Economic Storm Arc #10: Menaklukkan Cara Membaca Berita untuk Menentukan Risiko Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membaca Berita untuk Menentukan Risiko Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membaca Berita untuk Menentukan Risiko Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membaca berita untuk menentukan risiko trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:50",
            "durationSec": 890,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s13/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 14,
        "title": "SEASON 14 — Sesi Trading dan Karakteristik Pasar",
        "rawTitle": "Sesi Trading dan Karakteristik Pasar",
        "sagaId": 3,
        "sagaTitle": "BAGIAN 3 — ILMU ANALISIS PASAR",
        "arcName": "Hunting Seasons Arc",
        "tagline": "Jam Buka 4 Samudra: Sydney, Tokyo, London, New York",
        "description": "Kapan waktu paling aman untuk melempar jala? Memanfaatkan overlap sesi London-New York dengan volatilitas tinggi dan spread tipis.",
        "isFree": false,
        "totalDuration": "160 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s14_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Mengenal Jam Operasional Pasar Forex",
            "storyTitle": "Hunting Seasons Arc #1: Menaklukkan Mengenal Jam Operasional Pasar Forex",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Jam Operasional Pasar Forex' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Jam Operasional Pasar Forex dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal jam operasional pasar forex",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:17",
            "durationSec": 857,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep1.mp4"
          },
          {
            "id": "s14_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Sesi Sydney dan Karakteristiknya",
            "storyTitle": "Hunting Seasons Arc #2: Menaklukkan Sesi Sydney dan Karakteristiknya",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi Sydney dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sesi Sydney dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sesi sydney dan karakteristiknya",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:34",
            "durationSec": 1294,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep2.mp4"
          },
          {
            "id": "s14_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Sesi Tokyo dan Karakteristiknya",
            "storyTitle": "Hunting Seasons Arc #3: Menaklukkan Sesi Tokyo dan Karakteristiknya",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi Tokyo dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sesi Tokyo dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sesi tokyo dan karakteristiknya",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:51",
            "durationSec": 831,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep3.mp4"
          },
          {
            "id": "s14_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Sesi London dan Karakteristiknya",
            "storyTitle": "Hunting Seasons Arc #4: Menaklukkan Sesi London dan Karakteristiknya",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi London dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sesi London dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sesi london dan karakteristiknya",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:08",
            "durationSec": 1208,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep4.mp4"
          },
          {
            "id": "s14_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Sesi New York dan Karakteristiknya",
            "storyTitle": "Hunting Seasons Arc #5: Menaklukkan Sesi New York dan Karakteristiknya",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sesi New York dan Karakteristiknya' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sesi New York dan Karakteristiknya dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sesi new york dan karakteristiknya",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:25",
            "durationSec": 745,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep5.mp4"
          },
          {
            "id": "s14_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — London-New York Overlap",
            "storyTitle": "Hunting Seasons Arc #6: Menaklukkan London-New York Overlap",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'London-New York Overlap' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas London-New York Overlap dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari london-new york overlap",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:42",
            "durationSec": 1182,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep6.mp4"
          },
          {
            "id": "s14_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal Volatilitas Setiap Sesi",
            "storyTitle": "Hunting Seasons Arc #7: Menaklukkan Mengenal Volatilitas Setiap Sesi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Volatilitas Setiap Sesi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Volatilitas Setiap Sesi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal volatilitas setiap sesi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:59",
            "durationSec": 719,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep7.mp4"
          },
          {
            "id": "s14_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Spread dan Likuiditas pada Setiap Sesi",
            "storyTitle": "Hunting Seasons Arc #8: Menaklukkan Spread dan Likuiditas pada Setiap Sesi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Spread dan Likuiditas pada Setiap Sesi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Spread dan Likuiditas pada Setiap Sesi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari spread dan likuiditas pada setiap sesi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:16",
            "durationSec": 1096,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep8.mp4"
          },
          {
            "id": "s14_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Memilih Waktu Trading Berdasarkan Strategi",
            "storyTitle": "Hunting Seasons Arc #9: Menaklukkan Memilih Waktu Trading Berdasarkan Strategi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memilih Waktu Trading Berdasarkan Strategi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Memilih Waktu Trading Berdasarkan Strategi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari memilih waktu trading berdasarkan strategi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:33",
            "durationSec": 633,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep9.mp4"
          },
          {
            "id": "s14_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Praktik Membuat Jadwal Trading Harian",
            "storyTitle": "Hunting Seasons Arc #10: Menaklukkan Praktik Membuat Jadwal Trading Harian",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Praktik Membuat Jadwal Trading Harian' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Praktik Membuat Jadwal Trading Harian dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari praktik membuat jadwal trading harian",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:50",
            "durationSec": 1070,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s14/ep10.mp4"
          }
        ]
      }
    ],
    "totalEpisodes": 60
  },
  {
    "id": 4,
    "sagaNumber": 4,
    "title": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
    "subTitle": "Perisai Armament Haki 1% & Penakluk Harta Emas",
    "animeTheme": "Water 7 & Enies Lobby Saga: Perisai Besi Anti-MC & Pembasmi FOMO",
    "description": "Senjata tertajam di samudra trading bukanlah teknik profit, melainkan perisai pertahanan Anti-Margin Call. Kuasai SOP Fixed SL 30 Pips, jinakkan monster emas XAUUSD, dan musnahkan iblis mental FOMO serta Revenge Trading.",
    "seasonRange": "Season 15 - 18",
    "seasonNumbers": [
      15,
      16,
      17,
      18
    ],
    "isFree": false,
    "seasons": [
      {
        "seasonNumber": 15,
        "title": "SEASON 15 — Money Management dan Risk Management",
        "rawTitle": "Money Management dan Risk Management",
        "sagaId": 4,
        "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
        "arcName": "Iron Defense Arc",
        "tagline": "Armament Haki 1%: Benteng Anti Hancur & Fixed SL 30 Pips",
        "description": "Hukum keramat pembatas risiko yang membuat akun Anda mustahil terkena Margin Call meskipun diterpa badai kekalahan berturut-turut.",
        "isFree": false,
        "totalDuration": "190 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s15_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Money Management?",
            "storyTitle": "Iron Defense Arc #1: Menaklukkan Apa Itu Money Management?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Money Management?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Money Management? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu money management?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:17",
            "durationSec": 1037,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep1.mp4"
          },
          {
            "id": "s15_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Apa Itu Risk Management?",
            "storyTitle": "Iron Defense Arc #2: Menaklukkan Apa Itu Risk Management?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Risk Management?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Risk Management? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu risk management?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:34",
            "durationSec": 1474,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep2.mp4"
          },
          {
            "id": "s15_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Cara Menentukan Lot Berdasarkan Modal",
            "storyTitle": "Iron Defense Arc #3: Menaklukkan Cara Menentukan Lot Berdasarkan Modal",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menentukan Lot Berdasarkan Modal' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menentukan Lot Berdasarkan Modal dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menentukan lot berdasarkan modal",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:51",
            "durationSec": 1011,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep3.mp4"
          },
          {
            "id": "s15_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Cara Menghitung Risiko 1%, 2%, dan 3%",
            "storyTitle": "Iron Defense Arc #4: Menaklukkan Cara Menghitung Risiko 1%, 2%, dan 3%",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menghitung Risiko 1%, 2%, dan 3%' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menghitung Risiko 1%, 2%, dan 3% dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menghitung risiko 1%, 2%, dan 3%",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:08",
            "durationSec": 1388,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep4.mp4"
          },
          {
            "id": "s15_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Mengenal Risk to Reward Ratio (RR)",
            "storyTitle": "Iron Defense Arc #5: Menaklukkan Mengenal Risk to Reward Ratio (RR)",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Risk to Reward Ratio (RR)' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Risk to Reward Ratio (RR) dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal risk to reward ratio (rr)",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:25",
            "durationSec": 925,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep5.mp4"
          },
          {
            "id": "s15_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Cara Menentukan Stop Loss yang Rasional",
            "storyTitle": "Iron Defense Arc #6: Menaklukkan Cara Menentukan Stop Loss yang Rasional",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menentukan Stop Loss yang Rasional' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menentukan Stop Loss yang Rasional dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menentukan stop loss yang rasional",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:42",
            "durationSec": 1362,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep6.mp4"
          },
          {
            "id": "s15_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Cara Menentukan Take Profit",
            "storyTitle": "Iron Defense Arc #7: Menaklukkan Cara Menentukan Take Profit",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menentukan Take Profit' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menentukan Take Profit dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menentukan take profit",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:59",
            "durationSec": 899,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep7.mp4"
          },
          {
            "id": "s15_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Apa Itu Drawdown dan Cara Mengendalikannya?",
            "storyTitle": "Iron Defense Arc #8: Menaklukkan Apa Itu Drawdown dan Cara Mengendalikannya?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Drawdown dan Cara Mengendalikannya?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Drawdown dan Cara Mengendalikannya? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu drawdown dan cara mengendalikannya?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:16",
            "durationSec": 1276,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep8.mp4"
          },
          {
            "id": "s15_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Bahaya Overlot dan Overtrading",
            "storyTitle": "Iron Defense Arc #9: Menaklukkan Bahaya Overlot dan Overtrading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bahaya Overlot dan Overtrading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bahaya Overlot dan Overtrading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bahaya overlot dan overtrading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:33",
            "durationSec": 813,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep9.mp4"
          },
          {
            "id": "s15_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Membuat Money Management untuk Akun $100–$10.000",
            "storyTitle": "Iron Defense Arc #10: Menaklukkan Membuat Money Management untuk Akun $100–$10.000",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membuat Money Management untuk Akun $100–$10.000' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membuat Money Management untuk Akun $100–$10.000 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membuat money management untuk akun $100–$10.000",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:50",
            "durationSec": 1250,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s15/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 16,
        "title": "SEASON 16 — Strategi Trading Forex dari Pemula hingga Menengah",
        "rawTitle": "Strategi Trading Forex dari Pemula hingga Menengah",
        "sagaId": 4,
        "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
        "arcName": "Battle Styles Arc",
        "tagline": "Gaya Bertarung: Trend Following, Breakout, Scalping & Swing",
        "description": "Menemukan gaya trading yang paling selaras dengan kepribadian Anda, merakit Trading Plan baku, dan disiplin mengeksekusinya.",
        "isFree": false,
        "totalDuration": "263 Menit",
        "totalEpisodes": 15,
        "episodes": [
          {
            "id": "s16_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Trading Strategy?",
            "storyTitle": "Battle Styles Arc #1: Menaklukkan Apa Itu Trading Strategy?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Trading Strategy?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Trading Strategy? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu trading strategy?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:17",
            "durationSec": 1217,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep1.mp4"
          },
          {
            "id": "s16_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Strategi Support dan Resistance",
            "storyTitle": "Battle Styles Arc #2: Menaklukkan Strategi Support dan Resistance",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Support dan Resistance' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Support dan Resistance dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi support dan resistance",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:34",
            "durationSec": 754,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep2.mp4"
          },
          {
            "id": "s16_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Strategi Trend Following",
            "storyTitle": "Battle Styles Arc #3: Menaklukkan Strategi Trend Following",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Trend Following' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Trend Following dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi trend following",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:51",
            "durationSec": 1191,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep3.mp4"
          },
          {
            "id": "s16_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Strategi Moving Average Crossover",
            "storyTitle": "Battle Styles Arc #4: Menaklukkan Strategi Moving Average Crossover",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Moving Average Crossover' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Moving Average Crossover dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi moving average crossover",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:08",
            "durationSec": 668,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep4.mp4"
          },
          {
            "id": "s16_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Strategi Breakout Trading",
            "storyTitle": "Battle Styles Arc #5: Menaklukkan Strategi Breakout Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Breakout Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Breakout Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi breakout trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:25",
            "durationSec": 1105,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep5.mp4"
          },
          {
            "id": "s16_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Strategi Pullback dan Retest",
            "storyTitle": "Battle Styles Arc #6: Menaklukkan Strategi Pullback dan Retest",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Pullback dan Retest' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Pullback dan Retest dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi pullback dan retest",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:42",
            "durationSec": 642,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep6.mp4"
          },
          {
            "id": "s16_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Strategi Supply dan Demand",
            "storyTitle": "Battle Styles Arc #7: Menaklukkan Strategi Supply dan Demand",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Supply dan Demand' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Supply dan Demand dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi supply dan demand",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:59",
            "durationSec": 1079,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep7.mp4"
          },
          {
            "id": "s16_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Strategi Price Action",
            "storyTitle": "Battle Styles Arc #8: Menaklukkan Strategi Price Action",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Price Action' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Price Action dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi price action",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:16",
            "durationSec": 1456,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep8.mp4"
          },
          {
            "id": "s16_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Strategi Scalping dan Intraday",
            "storyTitle": "Battle Styles Arc #9: Menaklukkan Strategi Scalping dan Intraday",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Scalping dan Intraday' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Scalping dan Intraday dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi scalping dan intraday",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:33",
            "durationSec": 993,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep9.mp4"
          },
          {
            "id": "s16_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Strategi Swing Trading dan Position Trading",
            "storyTitle": "Battle Styles Arc #10: Menaklukkan Strategi Swing Trading dan Position Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Swing Trading dan Position Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Swing Trading dan Position Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi swing trading dan position trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:50",
            "durationSec": 1430,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep10.mp4"
          },
          {
            "id": "s16_ep11",
            "episodeNumber": 11,
            "title": "Episode 11 — Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional.",
            "storyTitle": "Battle Styles Arc #11: Menaklukkan Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Perbedaan Trader Pemula, Trader Konsisten, dan Trader Profesional. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari perbedaan trader pemula, trader konsisten, dan trader profesional.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:07",
            "durationSec": 907,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep11.mp4"
          },
          {
            "id": "s16_ep12",
            "episodeNumber": 12,
            "title": "Episode 12 — Cara Membuat Trading Plan Profesional.",
            "storyTitle": "Battle Styles Arc #12: Menaklukkan Cara Membuat Trading Plan Profesional.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat Trading Plan Profesional.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuat Trading Plan Profesional. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuat trading plan profesional.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:24",
            "durationSec": 1344,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep12.mp4"
          },
          {
            "id": "s16_ep13",
            "episodeNumber": 13,
            "title": "Episode 13 — Trading Journal: Mencatat dan Menganalisis Setiap Transaksi.",
            "storyTitle": "Battle Styles Arc #13: Menaklukkan Trading Journal: Mencatat dan Menganalisis Setiap Transaksi.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Trading Journal: Mencatat dan Menganalisis Setiap Transaksi.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Trading Journal: Mencatat dan Menganalisis Setiap Transaksi. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari trading journal: mencatat dan menganalisis setiap transaksi.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:41",
            "durationSec": 881,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep13.mp4"
          },
          {
            "id": "s16_ep14",
            "episodeNumber": 14,
            "title": "Episode 14 — Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa.",
            "storyTitle": "Battle Styles Arc #14: Menaklukkan Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Evaluasi Mingguan dan Bulanan untuk Meningkatkan Performa. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari evaluasi mingguan dan bulanan untuk meningkatkan performa.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:58",
            "durationSec": 1318,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep14.mp4"
          },
          {
            "id": "s16_ep15",
            "episodeNumber": 15,
            "title": "Episode 15 — Membangun Karier dan Bisnis di Industri Trading Forex.",
            "storyTitle": "Battle Styles Arc #15: Menaklukkan Membangun Karier dan Bisnis di Industri Trading Forex.",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membangun Karier dan Bisnis di Industri Trading Forex.' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membangun Karier dan Bisnis di Industri Trading Forex. dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membangun karier dan bisnis di industri trading forex.",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:15",
            "durationSec": 795,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s16/ep15.mp4"
          }
        ]
      },
      {
        "seasonNumber": 17,
        "title": "SEASON 17 — Mengenal Gold Trading (XAUUSD)",
        "rawTitle": "Mengenal Gold Trading (XAUUSD)",
        "sagaId": 4,
        "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
        "arcName": "Golden Dragon Arc",
        "tagline": "Menjinakkan Monster Emas XAUUSD: Volatilitas & Peluang",
        "description": "Instrumen paling disukai sekaligus paling mematikan bagi pemula. Kuasai karakteristik gerak emas dan cara menjaganya dengan SOP ketat.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s17_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Sejarah Emas sebagai Instrumen Keuangan",
            "storyTitle": "Golden Dragon Arc #1: Menaklukkan Sejarah Emas sebagai Instrumen Keuangan",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah Emas sebagai Instrumen Keuangan' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sejarah Emas sebagai Instrumen Keuangan dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sejarah emas sebagai instrumen keuangan",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:17",
            "durationSec": 1397,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep1.mp4"
          },
          {
            "id": "s17_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Apa Itu XAUUSD?",
            "storyTitle": "Golden Dragon Arc #2: Menaklukkan Apa Itu XAUUSD?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu XAUUSD?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu XAUUSD? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu xauusd?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:34",
            "durationSec": 934,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep2.mp4"
          },
          {
            "id": "s17_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mengapa Harga Emas Bisa Naik dan Turun?",
            "storyTitle": "Golden Dragon Arc #3: Menaklukkan Mengapa Harga Emas Bisa Naik dan Turun?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Harga Emas Bisa Naik dan Turun?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Harga Emas Bisa Naik dan Turun? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa harga emas bisa naik dan turun?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:51",
            "durationSec": 1371,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep3.mp4"
          },
          {
            "id": "s17_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Hubungan Gold dengan Dolar AS",
            "storyTitle": "Golden Dragon Arc #4: Menaklukkan Hubungan Gold dengan Dolar AS",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Hubungan Gold dengan Dolar AS' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Hubungan Gold dengan Dolar AS dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari hubungan gold dengan dolar as",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:08",
            "durationSec": 848,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep4.mp4"
          },
          {
            "id": "s17_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi",
            "storyTitle": "Golden Dragon Arc #5: Menaklukkan Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Hubungan Gold dengan Suku Bunga dan Imbal Hasil Obligasi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari hubungan gold dengan suku bunga dan imbal hasil obligasi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:25",
            "durationSec": 1285,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep5.mp4"
          },
          {
            "id": "s17_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Pengaruh Inflasi dan Geopolitik terhadap Gold",
            "storyTitle": "Golden Dragon Arc #6: Menaklukkan Pengaruh Inflasi dan Geopolitik terhadap Gold",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Pengaruh Inflasi dan Geopolitik terhadap Gold' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Pengaruh Inflasi dan Geopolitik terhadap Gold dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari pengaruh inflasi dan geopolitik terhadap gold",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:42",
            "durationSec": 822,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep6.mp4"
          },
          {
            "id": "s17_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal Karakteristik Volatilitas XAUUSD",
            "storyTitle": "Golden Dragon Arc #7: Menaklukkan Mengenal Karakteristik Volatilitas XAUUSD",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Karakteristik Volatilitas XAUUSD' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Karakteristik Volatilitas XAUUSD dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal karakteristik volatilitas xauusd",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:59",
            "durationSec": 1259,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep7.mp4"
          },
          {
            "id": "s17_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Strategi Support dan Resistance pada Gold",
            "storyTitle": "Golden Dragon Arc #8: Menaklukkan Strategi Support dan Resistance pada Gold",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Support dan Resistance pada Gold' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Support dan Resistance pada Gold dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi support dan resistance pada gold",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:16",
            "durationSec": 736,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep8.mp4"
          },
          {
            "id": "s17_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Strategi Scalping XAUUSD pada M5 dan M15",
            "storyTitle": "Golden Dragon Arc #9: Menaklukkan Strategi Scalping XAUUSD pada M5 dan M15",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Strategi Scalping XAUUSD pada M5 dan M15' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Strategi Scalping XAUUSD pada M5 dan M15 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari strategi scalping xauusd pada m5 dan m15",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:33",
            "durationSec": 1173,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep9.mp4"
          },
          {
            "id": "s17_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Simulasi Trading XAUUSD dengan SL, TP, dan Money Management",
            "storyTitle": "Golden Dragon Arc #10: Menaklukkan Simulasi Trading XAUUSD dengan SL, TP, dan Money Management",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Simulasi Trading XAUUSD dengan SL, TP, dan Money Management' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Simulasi Trading XAUUSD dengan SL, TP, dan Money Management dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari simulasi trading xauusd dengan sl, tp, dan money management",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:50",
            "durationSec": 710,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s17/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 18,
        "title": "SEASON 18 — Psikologi Trading dan Mental Trader",
        "rawTitle": "Psikologi Trading dan Mental Trader",
        "sagaId": 4,
        "sagaTitle": "BAGIAN 4 — MANAJEMEN RISIKO DAN STRATEGI",
        "arcName": "Conqueror Mindset Arc",
        "tagline": "Menundukkan Iblis Mental: Membunuh FOMO & Revenge Trading",
        "description": "Musuh terbesar seorang trader ada di depan cermin. Belajar berdamai dengan kekalahan kecil dan menjaga emosi dingin layaknya seorang sniper.",
        "isFree": false,
        "totalDuration": "175 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s18_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Psikologi Trading?",
            "storyTitle": "Conqueror Mindset Arc #1: Menaklukkan Apa Itu Psikologi Trading?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Psikologi Trading?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Psikologi Trading? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu psikologi trading?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:17",
            "durationSec": 677,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep1.mp4"
          },
          {
            "id": "s18_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengendalikan Emosi Saat Trading",
            "storyTitle": "Conqueror Mindset Arc #2: Menaklukkan Mengendalikan Emosi Saat Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengendalikan Emosi Saat Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengendalikan Emosi Saat Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengendalikan emosi saat trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:34",
            "durationSec": 1114,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep2.mp4"
          },
          {
            "id": "s18_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Mengatasi Rasa Takut Kehilangan Uang",
            "storyTitle": "Conqueror Mindset Arc #3: Menaklukkan Mengatasi Rasa Takut Kehilangan Uang",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengatasi Rasa Takut Kehilangan Uang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengatasi Rasa Takut Kehilangan Uang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengatasi rasa takut kehilangan uang",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:51",
            "durationSec": 651,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep3.mp4"
          },
          {
            "id": "s18_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengatasi Keserakahan atau Greed",
            "storyTitle": "Conqueror Mindset Arc #4: Menaklukkan Mengatasi Keserakahan atau Greed",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengatasi Keserakahan atau Greed' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengatasi Keserakahan atau Greed dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengatasi keserakahan atau greed",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:08",
            "durationSec": 1028,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep4.mp4"
          },
          {
            "id": "s18_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Revenge Trading: Bahaya Membalas Kerugian",
            "storyTitle": "Conqueror Mindset Arc #5: Menaklukkan Revenge Trading: Bahaya Membalas Kerugian",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Revenge Trading: Bahaya Membalas Kerugian' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Revenge Trading: Bahaya Membalas Kerugian dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari revenge trading: bahaya membalas kerugian",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:25",
            "durationSec": 1465,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep5.mp4"
          },
          {
            "id": "s18_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — FOMO: Takut Ketinggalan Peluang",
            "storyTitle": "Conqueror Mindset Arc #6: Menaklukkan FOMO: Takut Ketinggalan Peluang",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'FOMO: Takut Ketinggalan Peluang' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas FOMO: Takut Ketinggalan Peluang dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari fomo: takut ketinggalan peluang",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:42",
            "durationSec": 1002,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep6.mp4"
          },
          {
            "id": "s18_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Menghadapi Losing Streak",
            "storyTitle": "Conqueror Mindset Arc #7: Menaklukkan Menghadapi Losing Streak",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Menghadapi Losing Streak' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Menghadapi Losing Streak dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari menghadapi losing streak",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:59",
            "durationSec": 1439,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep7.mp4"
          },
          {
            "id": "s18_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengapa Trader Sering Melanggar Aturan Sendiri?",
            "storyTitle": "Conqueror Mindset Arc #8: Menaklukkan Mengapa Trader Sering Melanggar Aturan Sendiri?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Trader Sering Melanggar Aturan Sendiri?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Trader Sering Melanggar Aturan Sendiri? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa trader sering melanggar aturan sendiri?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:16",
            "durationSec": 916,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep8.mp4"
          },
          {
            "id": "s18_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Membangun Disiplin dan Konsistensi",
            "storyTitle": "Conqueror Mindset Arc #9: Menaklukkan Membangun Disiplin dan Konsistensi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membangun Disiplin dan Konsistensi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membangun Disiplin dan Konsistensi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membangun disiplin dan konsistensi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:33",
            "durationSec": 1353,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep9.mp4"
          },
          {
            "id": "s18_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Membentuk Mental Trader Profesional",
            "storyTitle": "Conqueror Mindset Arc #10: Menaklukkan Membentuk Mental Trader Profesional",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membentuk Mental Trader Profesional' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membentuk Mental Trader Profesional dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membentuk mental trader profesional",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:50",
            "durationSec": 890,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s18/ep10.mp4"
          }
        ]
      }
    ],
    "totalEpisodes": 45
  },
  {
    "id": 5,
    "sagaNumber": 5,
    "title": "BAGIAN 5 — TRADING MODERN DAN PENGEMBANGAN SISTEM",
    "subTitle": "Catatan Poneglyph & Memimpin Armada Trader Mandiri",
    "animeTheme": "New World & Laugh Tale Saga: Menjadi Kapten Trader Mandiri",
    "description": "Puncak tertinggi seorang petualang pasar: mencatat 100 ekspedisi di jurnal pembuktian, memadukan kecerdasan algoritma & AI, hingga akhirnya lulus berdiri mandiri dengan sistem trading objektif yang tahan segala cuaca.",
    "seasonRange": "Season 19 - 20",
    "seasonNumbers": [
      19,
      20
    ],
    "isFree": false,
    "seasons": [
      {
        "seasonNumber": 19,
        "title": "SEASON 19 — Backtesting, Trading Journal, dan Evaluasi Strategi",
        "rawTitle": "Backtesting, Trading Journal, dan Evaluasi Strategi",
        "sagaId": 5,
        "sagaTitle": "BAGIAN 5 — TRADING MODERN DAN PENGEMBANGAN SISTEM",
        "arcName": "Poneglyph Journal Arc",
        "tagline": "Kitab Ekspedisi 100 Trade: Backtest, Journal & Data Objektif",
        "description": "Hanya data yang tidak pernah berbohong. Menguji strategi dalam 100 skenario nyata dan menghitung Win Rate serta Profit Factor sejati.",
        "isFree": false,
        "totalDuration": "160 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s19_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Apa Itu Backtesting?",
            "storyTitle": "Poneglyph Journal Arc #1: Menaklukkan Apa Itu Backtesting?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Backtesting?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Backtesting? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu backtesting?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:17",
            "durationSec": 857,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep1.mp4"
          },
          {
            "id": "s19_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Mengapa Strategi Harus Diuji?",
            "storyTitle": "Poneglyph Journal Arc #2: Menaklukkan Mengapa Strategi Harus Diuji?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengapa Strategi Harus Diuji?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengapa Strategi Harus Diuji? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengapa strategi harus diuji?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:34",
            "durationSec": 1294,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep2.mp4"
          },
          {
            "id": "s19_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Cara Melakukan Backtest Manual",
            "storyTitle": "Poneglyph Journal Arc #3: Menaklukkan Cara Melakukan Backtest Manual",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Melakukan Backtest Manual' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Melakukan Backtest Manual dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara melakukan backtest manual",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:51",
            "durationSec": 831,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep3.mp4"
          },
          {
            "id": "s19_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Cara Menggunakan Strategy Tester MT5",
            "storyTitle": "Poneglyph Journal Arc #4: Menaklukkan Cara Menggunakan Strategy Tester MT5",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Menggunakan Strategy Tester MT5' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Menggunakan Strategy Tester MT5 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara menggunakan strategy tester mt5",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:08",
            "durationSec": 1208,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep4.mp4"
          },
          {
            "id": "s19_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Memahami Win Rate",
            "storyTitle": "Poneglyph Journal Arc #5: Menaklukkan Memahami Win Rate",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Win Rate' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Memahami Win Rate dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari memahami win rate",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "12:25",
            "durationSec": 745,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep5.mp4"
          },
          {
            "id": "s19_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Memahami Profit Factor dan Expected Value",
            "storyTitle": "Poneglyph Journal Arc #6: Menaklukkan Memahami Profit Factor dan Expected Value",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Memahami Profit Factor dan Expected Value' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Memahami Profit Factor dan Expected Value dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari memahami profit factor dan expected value",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "19:42",
            "durationSec": 1182,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep6.mp4"
          },
          {
            "id": "s19_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Menghitung Drawdown dan Recovery Factor",
            "storyTitle": "Poneglyph Journal Arc #7: Menaklukkan Menghitung Drawdown dan Recovery Factor",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Menghitung Drawdown dan Recovery Factor' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Menghitung Drawdown dan Recovery Factor dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari menghitung drawdown dan recovery factor",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "11:59",
            "durationSec": 719,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep7.mp4"
          },
          {
            "id": "s19_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Apa Itu Forward Testing?",
            "storyTitle": "Poneglyph Journal Arc #8: Menaklukkan Apa Itu Forward Testing?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Forward Testing?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Forward Testing? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu forward testing?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "18:16",
            "durationSec": 1096,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep8.mp4"
          },
          {
            "id": "s19_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Cara Membuat Trading Journal",
            "storyTitle": "Poneglyph Journal Arc #9: Menaklukkan Cara Membuat Trading Journal",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat Trading Journal' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuat Trading Journal dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuat trading journal",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "10:33",
            "durationSec": 633,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep9.mp4"
          },
          {
            "id": "s19_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi",
            "storyTitle": "Poneglyph Journal Arc #10: Menaklukkan Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Mengevaluasi Strategi Berdasarkan 100 Transaksi dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara mengevaluasi strategi berdasarkan 100 transaksi",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:50",
            "durationSec": 1070,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s19/ep10.mp4"
          }
        ]
      },
      {
        "seasonNumber": 20,
        "title": "SEASON 20 — EA, Algoritma, AI, dan Menjadi Trader Mandiri",
        "rawTitle": "EA, Algoritma, AI, dan Menjadi Trader Mandiri",
        "sagaId": 5,
        "sagaTitle": "BAGIAN 5 — TRADING MODERN DAN PENGEMBANGAN SISTEM",
        "arcName": "Armada Commander Arc",
        "tagline": "Wisuda Kapten Mandiri: Algoritma, EA, AI & Trader Profesional",
        "description": "Menggabungkan kedisiplinan manusia dengan kecepatan komputasi modern. Melangkah keluar sebagai Trader Realistis Mandiri seumur hidup.",
        "isFree": false,
        "totalDuration": "190 Menit",
        "totalEpisodes": 10,
        "episodes": [
          {
            "id": "s20_ep1",
            "episodeNumber": 1,
            "title": "Episode 1 — Sejarah Perkembangan Algorithmic Trading",
            "storyTitle": "Armada Commander Arc #1: Menaklukkan Sejarah Perkembangan Algorithmic Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Sejarah Perkembangan Algorithmic Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Sejarah Perkembangan Algorithmic Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari sejarah perkembangan algorithmic trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "17:17",
            "durationSec": 1037,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep1.mp4"
          },
          {
            "id": "s20_ep2",
            "episodeNumber": 2,
            "title": "Episode 2 — Apa Itu Expert Advisor (EA)?",
            "storyTitle": "Armada Commander Arc #2: Menaklukkan Apa Itu Expert Advisor (EA)?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Apa Itu Expert Advisor (EA)?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Apa Itu Expert Advisor (EA)? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari apa itu expert advisor (ea)?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "24:34",
            "durationSec": 1474,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep2.mp4"
          },
          {
            "id": "s20_ep3",
            "episodeNumber": 3,
            "title": "Episode 3 — Bagaimana Cara Kerja EA pada MT4 dan MT5?",
            "storyTitle": "Armada Commander Arc #3: Menaklukkan Bagaimana Cara Kerja EA pada MT4 dan MT5?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Bagaimana Cara Kerja EA pada MT4 dan MT5?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Bagaimana Cara Kerja EA pada MT4 dan MT5? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari bagaimana cara kerja ea pada mt4 dan mt5?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "16:51",
            "durationSec": 1011,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep3.mp4"
          },
          {
            "id": "s20_ep4",
            "episodeNumber": 4,
            "title": "Episode 4 — Mengenal Dasar Pemrograman MQL4 dan MQL5",
            "storyTitle": "Armada Commander Arc #4: Menaklukkan Mengenal Dasar Pemrograman MQL4 dan MQL5",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Dasar Pemrograman MQL4 dan MQL5' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Dasar Pemrograman MQL4 dan MQL5 dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal dasar pemrograman mql4 dan mql5",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "23:08",
            "durationSec": 1388,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep4.mp4"
          },
          {
            "id": "s20_ep5",
            "episodeNumber": 5,
            "title": "Episode 5 — Cara Membuat EA Sederhana",
            "storyTitle": "Armada Commander Arc #5: Menaklukkan Cara Membuat EA Sederhana",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Membuat EA Sederhana' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Membuat EA Sederhana dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara membuat ea sederhana",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "15:25",
            "durationSec": 925,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep5.mp4"
          },
          {
            "id": "s20_ep6",
            "episodeNumber": 6,
            "title": "Episode 6 — Cara Backtest dan Optimasi EA",
            "storyTitle": "Armada Commander Arc #6: Menaklukkan Cara Backtest dan Optimasi EA",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Cara Backtest dan Optimasi EA' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Cara Backtest dan Optimasi EA dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari cara backtest dan optimasi ea",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "22:42",
            "durationSec": 1362,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep6.mp4"
          },
          {
            "id": "s20_ep7",
            "episodeNumber": 7,
            "title": "Episode 7 — Mengenal VPS untuk Menjalankan EA 24 Jam",
            "storyTitle": "Armada Commander Arc #7: Menaklukkan Mengenal VPS untuk Menjalankan EA 24 Jam",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal VPS untuk Menjalankan EA 24 Jam' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal VPS untuk Menjalankan EA 24 Jam dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal vps untuk menjalankan ea 24 jam",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "14:59",
            "durationSec": 899,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep7.mp4"
          },
          {
            "id": "s20_ep8",
            "episodeNumber": 8,
            "title": "Episode 8 — Mengenal Copy Trading, Trading Bot, dan AI Trading",
            "storyTitle": "Armada Commander Arc #8: Menaklukkan Mengenal Copy Trading, Trading Bot, dan AI Trading",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Mengenal Copy Trading, Trading Bot, dan AI Trading' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Mengenal Copy Trading, Trading Bot, dan AI Trading dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari mengenal copy trading, trading bot, dan ai trading",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "21:16",
            "durationSec": 1276,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep8.mp4"
          },
          {
            "id": "s20_ep9",
            "episodeNumber": 9,
            "title": "Episode 9 — Membangun Sistem Trading Pribadi: Manual atau Otomatis?",
            "storyTitle": "Armada Commander Arc #9: Menaklukkan Membangun Sistem Trading Pribadi: Manual atau Otomatis?",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Membangun Sistem Trading Pribadi: Manual atau Otomatis?' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Membangun Sistem Trading Pribadi: Manual atau Otomatis? dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari membangun sistem trading pribadi: manual atau otomatis?",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "13:33",
            "durationSec": 813,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep9.mp4"
          },
          {
            "id": "s20_ep10",
            "episodeNumber": 10,
            "title": "Episode 10 — Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional",
            "storyTitle": "Armada Commander Arc #10: Menaklukkan Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional",
            "synopsis": "Dalam bab ini, petualang diajak menyelami 'Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional' melalui analogi petualangan nyata. Seperti seorang kapten kapal yang harus memahami cuaca sebelum mengangkat sauh, trader tidak boleh sekadar menebak arah grafik. Materi ini merombak pemahaman teknis yang rumit menjadi konsep praktis yang mudah dicerna, terarah, dan membuka mindset bisnis yang sehat.",
            "educationalTakeaway": "Memahami secara tuntas Graduation: Dari Pemula Menjadi Trader Mandiri dan Profesional dan menerapkannya sebagai bagian dari pertahanan SOP RealistisFx tanpa tebak-tebakan.",
            "keyPoints": [
              "Konsep dasar dan esensi matematis dari graduation: dari pemula menjadi trader mandiri dan profesional",
              "Perbedaan praktik di akun demo vs kondisi pasar riil yang sebenarnya",
              "SOP Baku RealistisFx untuk mengantisipasi risiko kegagalan",
              "Kesalahan umum 90% pemula dan cara menghindarinya secara objektif"
            ],
            "duration": "20:50",
            "durationSec": 1250,
            "isFree": false,
            "dummyVideoUrl": "https://realistisfx.dummy-stream/s20/ep10.mp4"
          }
        ]
      }
    ],
    "totalEpisodes": 20
  }
];

export const TOTAL_EPISODES_COUNT = ALL_SEASONS.reduce((acc, s) => acc + s.episodes.length, 0);

export function getSeasonByNumber(seasonNum: number): AcademySeason | undefined {
  return ALL_SEASONS.find((s) => s.seasonNumber === seasonNum);
}

export function getEpisodeById(episodeId: string): AcademyEpisode | undefined {
  for (const season of ALL_SEASONS) {
    const found = season.episodes.find((ep) => ep.id === episodeId);
    if (found) return found;
  }
  return undefined;
}

export function getEpisodesCountBySaga(sagaId: number): number {
  const saga = ACADEMY_SAGAS.find((s) => s.id === sagaId);
  if (!saga) return 0;
  return saga.seasons.reduce((acc, s) => acc + s.episodes.length, 0);
}
