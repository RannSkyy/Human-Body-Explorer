import { BodyPart } from '../types';

export const BODY_PARTS_DATA: BodyPart[] = [
  // ================= ORGAN DALAM UTAMA =================
  {
    id: 'otak',
    name: 'Otak',
    latinName: 'Encephalon / Cerebrum',
    category: 'inner',
    system: 'Sistem Koordinasi (Saraf & Indra)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Pusat pengendali seluruh pikiran, ingatan, gerak, dan fungsi tubuh.',
    fullExplanation:
      'Otak manusia adalah organ paling kompleks di dalam tubuh. Terdiri dari otak besar (cerebrum) untuk berpikir, otak kecil (cerebellum) untuk keseimbangan dan gerak, serta batang otak untuk mengatur detak jantung dan pernapasan.',
    healthTips: [
      'Tidur cukup 8 jam per malam untuk menjaga daya ingat.',
      'Rutin membaca dan belajar hal baru agar sel otak tetap aktif.',
      'Konsumsi makanan bergizi seperti ikan, telur, dan kacang-kacangan.'
    ],
    funFact: 'Otak manusia hanya berbobot sekitar 1,4 kg, tetapi mengonsumsi 20% energi dari seluruh tubuh!',
    marker: { x: 50, y: 7.5 },
    color: '#ec4899', // Pink
    iconName: 'Brain'
  },
  {
    id: 'jantung',
    name: 'Jantung',
    latinName: 'Cor',
    category: 'inner',
    system: 'Sistem Sirkulasi (Peredaran Darah)',
    region: 'chest',
    regionLabel: 'Dada',
    shortDesc: 'Memompa darah beroksigen ke seluruh tubuh tanpa henti.',
    fullExplanation:
      'Jantung adalah organ berotot seukuran kepalan tangan yang terletak di rongga dada sebelah kiri. Jantung bekerja seperti pompa otomatis yang mengalirkan darah kaya oksigen dan nutrisi ke setiap sel tubuh.',
    healthTips: [
      'Olahraga aerobik teratur minimal 30 menit sehari.',
      'Kurangi konsumsi makanan tinggi lemak jenuh dan garam berlebih.',
      'Kelola stres dan hindari paparan asap rokok.'
    ],
    funFact: 'Jantung berdetak rata-rata 100.000 kali dalam sehari dan memompa sekitar 7.500 liter darah!',
    marker: { x: 53, y: 26 },
    color: '#ef4444', // Red
    iconName: 'Heart'
  },
  {
    id: 'paru-paru',
    name: 'Paru-paru',
    latinName: 'Pulmo',
    category: 'inner',
    system: 'Sistem Pernapasan (Respirasi)',
    region: 'chest',
    regionLabel: 'Dada',
    shortDesc: 'Menukar oksigen dari udara dengan karbon dioksida dari darah.',
    fullExplanation:
      'Paru-paru terdiri dari dua bagian (kanan dan kiri) di dalam rongga dada. Di dalamnya terdapat jutaan kantung udara kecil bernama alveolus, tempat oksigen diserap ke dalam darah dan zat sisa karbon dioksida dibuang keluar saat kita mengembuskan napas.',
    healthTips: [
      'Jauhi rokok dan lingkungan berpolusi tinggi.',
      'Latihan pernapasan dalam setiap pagi untuk melatih kapasitas paru-paru.',
      'Jaga ventilasi udara di kamar tidur tetap bersih.'
    ],
    funFact: 'Jika seluruh alveolus di kedua paru-paru dibentangkan, luasnya bisa menutupi satu lapangan tenis!',
    marker: { x: 44, y: 25 },
    color: '#06b6d4', // Cyan
    iconName: 'Wind'
  },
  {
    id: 'lambung',
    name: 'Lambung',
    latinName: 'Ventriculus / Gaster',
    category: 'inner',
    system: 'Sistem Pencernaan (Digesti)',
    region: 'abdomen',
    regionLabel: 'Perut',
    shortDesc: 'Mencerna makanan secara kimiawi dengan enzim dan asam lambung.',
    fullExplanation:
      'Lambung berbentuk seperti huruf J dan bertugas mengaduk serta menghancurkan makanan yang kita telan. Lambung memproduksi asam klorida (HCl) yang sangat kuat untuk membunuh bakteri jahat dan enzim pepsin untuk mencerna protein.',
    healthTips: [
      'Makan tepat waktu dan jangan sering terlambat makan.',
      'Kunyah makanan secara perlahan dan sampai halus.',
      'Batasi makanan yang terlalu asam atau terlampau pedas jika perut sensitif.'
    ],
    funFact: 'Lapisan lendir lambung beregenerasi setiap 3–4 hari agar tidak terkikis oleh asam kuatnya sendiri!',
    marker: { x: 53, y: 35 },
    color: '#f59e0b', // Amber
    iconName: 'Soup'
  },
  {
    id: 'hati',
    name: 'Hati',
    latinName: 'Hepar',
    category: 'inner',
    system: 'Sistem Pencernaan (Digesti)',
    region: 'abdomen',
    regionLabel: 'Perut',
    shortDesc: 'Menetralkan racun dan menghasilkan cairan empedu untuk lemak.',
    fullExplanation:
      'Hati adalah kelenjar terbesar di dalam tubuh, terletak di bagian kanan atas perut. Hati berfungsi menyaring zat beracun, menyimpan cadangan energi (glikogen), dan menghasilkan empedu untuk mencerna lemak dari makanan.',
    healthTips: [
      'Minum air putih yang cukup sepanjang hari.',
      'Kurangi makanan olahan tinggi pengawet.',
      'Hindari konsumsi obat tanpa resep atau anjuran medis.'
    ],
    funFact: 'Hati adalah satu-satunya organ dalam tubuh yang bisa menumbuhkan kembali jaringannya sendiri (regenerasi)!',
    marker: { x: 44, y: 34 },
    color: '#b45309', // Brown amber
    iconName: 'ShieldCheck'
  },
  {
    id: 'ginjal',
    name: 'Ginjal',
    latinName: 'Ren',
    category: 'inner',
    system: 'Sistem Ekskresi (Pengeluaran)',
    region: 'abdomen',
    regionLabel: 'Pinggang',
    shortDesc: 'Menyaring darah dari zat sisa dan mengatur keseimbangan cairan tubuh.',
    fullExplanation:
      'Manusia memiliki dua buah ginjal di kanan dan kiri pinggang belakang. Ginjal bertindak seperti filter canggih yang membersihkan sekitar 200 liter darah per hari dan membuang zat sisa metabolisme dalam bentuk air seni (urin).',
    healthTips: [
      'Minum minimal 8 gelas (sekitar 2 liter) air putih setiap hari.',
      'Jangan sering menahan buang air kecil.',
      'Kurangi konsumsi minuman bersoda dan terlalu manis.'
    ],
    funFact: 'Setiap ginjal memiliki sekitar satu juta unit penyaring mikro yang disebut nefron!',
    marker: { x: 47, y: 40 },
    color: '#8b5cf6', // Violet
    iconName: 'Droplets'
  },
  {
    id: 'usus',
    name: 'Usus (Halus & Besar)',
    latinName: 'Intestinum Tenue & Crassum',
    category: 'inner',
    system: 'Sistem Pencernaan (Digesti)',
    region: 'abdomen',
    regionLabel: 'Perut',
    shortDesc: 'Menyerap sari makanan dan air, lalu membentuk feses untuk dibuang.',
    fullExplanation:
      'Usus halus bertugas menyerap vitamin, mineral, protein, dan karbohidrat ke dalam peredaran darah. Usus besar melanjutkan tugas dengan menyerap sisa air dan membentuk ampas makanan sebelum dikeluarkan melalui anus.',
    healthTips: [
      'Konsumsi sayuran hijau dan buah-buahan berserat tinggi setiap hari.',
      'Makan makanan yang mengandung probiotik alami seperti yogurt.',
      'Rutin beraktivitas fisik untuk merangsang pergerakan usus (peristaltik).'
    ],
    funFact: 'Jika direntangkan, panjang seluruh saluran usus manusia dewasa bisa mencapai lebih dari 7 meter!',
    marker: { x: 50, y: 44 },
    color: '#10b981', // Emerald
    iconName: 'Activity'
  },
  {
    id: 'tulang',
    name: 'Sistem Rangka & Tulang',
    latinName: 'Skeleton',
    category: 'inner',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'chest',
    regionLabel: 'Seluruh Tubuh',
    shortDesc: 'Menopang bentuk tubuh, melindungi organ lunak, dan tempat melekatnya otot.',
    fullExplanation:
      'Tubuh manusia dewasa terdiri dari 206 tulang yang saling terhubung oleh sendi. Tulang tengkorak melindungi otak, tulang rusuk melindungi jantung dan paru-paru, serta sumsum tulang memproduksi sel-sel darah baru.',
    healthTips: [
      'Dapatkan sinar matahari pagi untuk membantu sintesis Vitamin D.',
      'Cukupi asupan kalsium dari susu, tempe, tahu, atau ikan teri.',
      'Jaga postur duduk yang tegak saat belajar di sekolah atau di rumah.'
    ],
    funFact: 'Tulang paha (femur) adalah tulang terpanjang dan terkuat di tubuh manusia, bahkan lebih kuat dari beton bertulang!',
    marker: { x: 58, y: 56 },
    color: '#64748b', // Slate
    iconName: 'Layers'
  },

  // ================= BAGIAN LUAR TUBUH =================
  {
    id: 'kepala',
    name: 'Kepala & Rambut',
    latinName: 'Caput',
    category: 'outer',
    system: 'Bagian Luar & Pelindung Tubuh',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Bagian paling atas yang memuat otak dan sebagian besar organ indra.',
    fullExplanation:
      'Kepala adalah tempat bertemunya pusat koordinasi dan panca indra. Dilindungi oleh tulang tengkorak yang kokoh serta rambut di bagian luar yang membantu melindungi kulit kepala dari terik sinar matahari dan gesekan ringan.',
    healthTips: [
      'Gunakan helm standar saat berkendara sepeda atau motor.',
      'Keramas teratur dengan sampo lembut untuk menjaga kebersihan kulit kepala.'
    ],
    funFact: 'Manusia rata-rata memiliki sekitar 100.000 helai rambut di kepala!',
    marker: { x: 50, y: 5 },
    color: '#0284c7',
    iconName: 'Smile'
  },
  {
    id: 'mata',
    name: 'Mata',
    latinName: 'Oculus',
    category: 'outer',
    system: 'Sistem Koordinasi (Saraf & Indra)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Indra penglihatan untuk menangkap cahaya dan melihat lingkungan sekitar.',
    fullExplanation:
      'Mata menangkap pantulan cahaya melalui kornea dan lensa, lalu memfokuskannya ke retina. Sinyal cahaya diubah menjadi sinyal listrik yang diteruskan ke otak agar kita dapat mengenali warna, bentuk, dan jarak benda.',
    healthTips: [
      'Terapkan aturan 20-20-20: setiap 20 menit menatap layar, lihat objek berjarak 6 meter selama 20 detik.',
      'Hindari membaca di tempat yang terlalu redup atau sambil tiduran.',
      'Makan makanan kaya vitamin A seperti wortel, tomat, dan bayam.'
    ],
    funFact: 'Mata manusia bisa membedakan sekitar 10 juta variasi warna yang berbeda!',
    marker: { x: 47, y: 8.5 },
    color: '#0ea5e9',
    iconName: 'Eye'
  },
  {
    id: 'telinga',
    name: 'Telinga',
    latinName: 'Auris',
    category: 'outer',
    system: 'Sistem Koordinasi (Saraf & Indra)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Indra pendengaran sekaligus pengatur keseimbangan posisi tubuh.',
    fullExplanation:
      'Telinga menangkap gelombang suara di udara melalui daun telinga, menggetarkan gendang telinga dan tulang pendengaran, hingga diubah menjadi impuls saraf di koklea. Di telinga dalam juga terdapat saluran setengah lingkaran untuk menjaga keseimbangan berdiri dan bergerak.',
    healthTips: [
      'Jangan mendengarkan musik lewat earphone dengan volume terlalu keras.',
      'Hindari mengorek telinga terlalu dalam dengan cotton bud tajam.',
      'Keringkan telinga setelah mandi atau berenang.'
    ],
    funFact: 'Tulang terkecil di seluruh tubuh manusia bernama stapes (tulang sanggurdi), letaknya ada di dalam telinga!',
    marker: { x: 42, y: 9.5 },
    color: '#06b6d4',
    iconName: 'Ear'
  },
  {
    id: 'hidung',
    name: 'Hidung',
    latinName: 'Nasus',
    category: 'outer',
    system: 'Sistem Pernapasan (Respirasi)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Indra pembau sekaligus pintu masuk udara yang disaring dan dihangatkan.',
    fullExplanation:
      'Hidung memiliki rambut halus (silia) dan lendir untuk menyaring debu serta kotoran dari udara yang kita hirup. Selain itu, saraf olfaktori di rongga hidung atas memungkinkan kita mencium berbagai aroma harum maupun tidak sedap.',
    healthTips: [
      'Gunakan masker saat berada di jalan raya berdebu atau berpolusi.',
      'Jaga kelembapan rongga hidung dan jangan mencabuti rambut hidung sembarangan.'
    ],
    funFact: 'Hidung manusia mampu mengenali dan membedakan hingga 1 triliun aroma unik!',
    marker: { x: 50, y: 10.5 },
    color: '#3b82f6',
    iconName: 'HelpCircle'
  },
  {
    id: 'mulut',
    name: 'Mulut & Gigi',
    latinName: 'Os / Cavum Oris',
    category: 'outer',
    system: 'Sistem Pencernaan (Digesti)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Tempat masuknya makanan, mengunyah, merasakan rasa, dan berbicara.',
    fullExplanation:
      'Mulut memuat gigi untuk memotong dan melumatkan makanan, lidah sebagai indra pengecap dan pengatur posisi makanan, serta kelenjar ludah yang menghasilkan enzim ptialin (amilase) untuk mencerna zat tepung secara kimiawi.',
    healthTips: [
      'Sikat gigi 2 kali sehari: setelah sarapan dan sebelum tidur malam.',
      'Batasi makanan yang terlalu manis dan lengket pada gigi.',
      'Periksa kesehatan gigi ke dokter gigi setiap 6 bulan sekali.'
    ],
    funFact: 'Enamel gigi adalah zat paling keras di dalam seluruh tubuh manusia!',
    marker: { x: 50, y: 12.5 },
    color: '#f43f5e',
    iconName: 'Smile'
  },
  {
    id: 'leher',
    name: 'Leher',
    latinName: 'Collum / Cervix',
    category: 'outer',
    system: 'Bagian Luar & Pelindung Tubuh',
    region: 'head',
    regionLabel: 'Leher',
    shortDesc: 'Penyambung kepala dengan tubuh yang berisi saluran pernapasan dan pembuluh darah utama.',
    fullExplanation:
      'Leher ditopang oleh 7 ruas tulang leher (vertebra servikal) yang memungkinkan kepala kita menoleh, mendongak, dan mengangguk. Di leher juga lewat saluran kerongkongan, tenggorokan (trakea), serta arteri karotis pembawa darah ke otak.',
    healthTips: [
      'Hindari posisi menunduk terlalu lama saat menggunakan ponsel (tech neck).',
      'Gunakan bantal yang pas, tidak terlalu tinggi atau terlalu keras.'
    ],
    funFact: 'Meskipun leher jerapah sangat panjang, jumlah ruas tulang lehernya persis sama dengan manusia, yaitu 7 ruas!',
    marker: { x: 50, y: 15.5 },
    color: '#6366f1',
    iconName: 'Maximize2'
  },
  {
    id: 'bahu',
    name: 'Bahu',
    latinName: 'Humerus / Scapula',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'chest',
    regionLabel: 'Batang Tubuh',
    shortDesc: 'Sendi peluru yang menghubungkan lengan dengan badan sehingga lengan bebas berputar.',
    fullExplanation:
      'Bahu memiliki rentang gerak paling luas dibanding sendi lainnya. Sendi peluru di bahu memungkinkan tangan kita berputar, mengangkat beban, dan bergerak ke segala arah.',
    healthTips: [
      'Jangan membawa ransel sekolah yang terlalu berat hanya di satu pundak.',
      'Lakukan peregangan bahu sebelum dan sesudah berolahraga.'
    ],
    funFact: 'Sendi bahu adalah sendi paling fleksibel di tubuh manusia, tetapi juga paling rawan mengalami cedera jika dipaksa!',
    marker: { x: 37, y: 19 },
    color: '#8b5cf6',
    iconName: 'Shield'
  },
  {
    id: 'lengan',
    name: 'Lengan',
    latinName: 'Brachium',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_upper',
    regionLabel: 'Anggota Gerak Atas',
    shortDesc: 'Bagian gerak atas yang berisi otot bisep dan trisep untuk mengangkat barang.',
    fullExplanation:
      'Lengan terdiri dari lengan atas (humerus) dan lengan bawah (radius dan ulna). Kerjasama otot bisep yang berkontraksi dan trisep yang berelaksasi memungkinkan kita menekuk siku dan mengangkat benda.',
    healthTips: [
      'Latih otot lengan dengan push-up ringan atau bergelantungan santai.',
      'Minum air cukup untuk mencegah kram otot.'
    ],
    funFact: 'Otot bisep dan trisep bekerja secara berlawanan (antagonis) saat kita menekuk dan meluruskan tangan!',
    marker: { x: 33, y: 27 },
    color: '#3b82f6',
    iconName: 'Zap'
  },
  {
    id: 'siku',
    name: 'Siku',
    latinName: 'Cubitus',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_upper',
    regionLabel: 'Anggota Gerak Atas',
    shortDesc: 'Sendi engsel yang memungkinkan lengan ditekuk dan diluruskan satu arah.',
    fullExplanation:
      'Siku bekerja mirip engsel pintu. Sendi ini menghubungkan tulang lengan atas dengan dua tulang lengan bawah, memungkinkan gerakan melipat dan meluruskan tangan dengan stabil.',
    healthTips: [
      'Gunakan pelindung siku saat bermain sepatu roda atau skateboard.',
      'Hindari bertumpu terlalu keras pada siku di meja saat belajar.'
    ],
    funFact: 'Sensasi ngilu menggelitik saat siku terbentur disebabkan oleh saraf ulnar yang berada dekat di bawah permukaan kulit!',
    marker: { x: 31, y: 32 },
    color: '#6366f1',
    iconName: 'Crosshair'
  },
  {
    id: 'tangan',
    name: 'Tangan & Telapak',
    latinName: 'Manus',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_upper',
    regionLabel: 'Anggota Gerak Atas',
    shortDesc: 'Alat gerak aktif untuk memegang, menulis, mengetik, dan menyentuh.',
    fullExplanation:
      'Telapak tangan kaya akan saraf sensorik sentuhan dan ditopang oleh 27 tulang kecil. Struktur ibu jari yang berlawanan (opposable thumb) memungkinkan manusia menggenggam benda dengan presisi tinggi.',
    healthTips: [
      'Cuci tangan dengan sabun dan air mengalir selama 20 detik sebelum makan.',
      'Istirahatkan tangan saat mengetik atau menulis dalam waktu lama.'
    ],
    funFact: 'Sekitar seperempat dari seluruh tulang tubuh manusia berada di sepasang tangan kita!',
    marker: { x: 26, y: 44 },
    color: '#14b8a6',
    iconName: 'Hand'
  },
  {
    id: 'jari',
    name: 'Jari Tangan',
    latinName: 'Digiti Manus',
    category: 'outer',
    system: 'Sistem Koordinasi (Saraf & Indra)',
    region: 'limbs_upper',
    regionLabel: 'Anggota Gerak Atas',
    shortDesc: 'Ujung indra peraba dengan sidik jari unik untuk sentuhan halus.',
    fullExplanation:
      'Jari tangan memiliki kepekaan sensorik yang sangat tajam. Pada ujung jari terdapat sidik jari yang polanya unik dan tidak sama bahkan pada anak kembar identik.',
    healthTips: [
      'Potong kuku secara teratur dan jangan menggigiti kuku jari.',
      'Jaga kebersihan bawah kuku dari kuman kotoran.'
    ],
    funFact: 'Di dalam jari tangan sebenarnya tidak ada otot! Gerakan jari dikendalikan oleh otot-otot di telapak dan lengan bawah lewat urat tendon.',
    marker: { x: 24, y: 49 },
    color: '#10b981',
    iconName: 'CheckCircle'
  },
  {
    id: 'dada',
    name: 'Dada',
    latinName: 'Thorax',
    category: 'outer',
    system: 'Bagian Luar & Pelindung Tubuh',
    region: 'chest',
    regionLabel: 'Batang Tubuh',
    shortDesc: 'Rongga pelindung bagi organ vital jantung dan paru-paru.',
    fullExplanation:
      'Dada manusia dibentuk oleh tulang dada (sternum) dan 12 pasang tulang rusuk. Saat kita bernapas, rongga dada membesar dan mengecil karena kerja otot antar tulang rusuk dan diafragma.',
    healthTips: [
      'Biasakan duduk tegak agar rongga dada mengembang optimal saat bernapas.',
      'Lakukan olahraga renang atau lari untuk memperkuat otot dada.'
    ],
    funFact: 'Tulang rusuk manusia bergerak naik turun sekitar 5 juta kali dalam satu tahun karena pernapasan!',
    marker: { x: 50, y: 22 },
    color: '#0284c7',
    iconName: 'Box'
  },
  {
    id: 'perut',
    name: 'Perut',
    latinName: 'Abdomen',
    category: 'outer',
    system: 'Bagian Luar & Pelindung Tubuh',
    region: 'abdomen',
    regionLabel: 'Batang Tubuh',
    shortDesc: 'Bagian tengah badan tempat bersemayamnya organ-organ pencernaan.',
    fullExplanation:
      'Perut tidak memiliki pelindung tulang padat seperti dada, melainkan dilindungi oleh lapisan otot perut yang fleksibel. Di dalam rongga perut terdapat lambung, hati, ginjal, pankreas, dan usus.',
    healthTips: [
      'Hindari makan terlalu kenyang hingga perut terasa begah.',
      'Latih otot perut dengan gerakan sit-up atau plank secara teratur.'
    ],
    funFact: 'Dinding perut mampu meregang dengan elastis untuk menampung makanan yang masuk ke lambung!',
    marker: { x: 50, y: 36 },
    color: '#f97316',
    iconName: 'Circle'
  },
  {
    id: 'pinggang',
    name: 'Pinggang & Punggung',
    latinName: 'Dorsum & Lumbale',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'back',
    regionLabel: 'Batang Tubuh',
    shortDesc: 'Pilar utama tubuh yang ditopang tulang belakang untuk menegakkan badan.',
    fullExplanation:
      'Punggung memuat tulang belakang (vertebra) yang fleksibel dan melindungi sumsum tulang belakang. Otot punggung dan pinggang menahan berat tubuh bagian atas saat kita berdiri, membungkuk, dan berjalan.',
    healthTips: [
      'Saat mengangkat barang berat dari lantai, tekuk lutut dan jangan membungkukkan punggung.',
      'Gunakan kursi belajar yang mendukung lekuk alami tulang punggung.'
    ],
    funFact: 'Saat bangun pagi, tinggi badanmu sebenarnya sedikit lebih tinggi sekitar 1 cm dibanding sore hari karena bantalan tulang belakang mengembang saat tidur!',
    marker: { x: 50, y: 41 },
    color: '#64748b',
    iconName: 'AlignJustify'
  },
  {
    id: 'pinggul',
    name: 'Pinggul & Panggul',
    latinName: 'Pelvis',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'abdomen',
    regionLabel: 'Batang Tubuh',
    shortDesc: 'Cincin tulang kuat yang menyatukan tubuh bagian atas dengan kaki.',
    fullExplanation:
      'Panggul adalah struktur tulang seperti mangkuk besar yang menopang organ perut bagian bawah dan menjadi tempat bertemunya sendi peluru kaki (femur).',
    healthTips: [
      'Lakukan jalan kaki santai setiap hari untuk menjaga mobilitas panggul.',
      'Hindari duduk bersila miring terlalu lama yang bisa mengubah postur.'
    ],
    funFact: 'Bentuk tulang panggul manusia dirancang khusus agar kita bisa berjalan tegak dengan dua kaki (bipedal)!',
    marker: { x: 50, y: 47 },
    color: '#8b5cf6',
    iconName: 'Anchor'
  },
  {
    id: 'paha',
    name: 'Paha',
    latinName: 'Femur',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_lower',
    regionLabel: 'Anggota Gerak Bawah',
    shortDesc: 'Bagian kaki atas dengan otot kuadrisep terkuat untuk berjalan dan melompat.',
    fullExplanation:
      'Paha memuat otot-otot paling besar dan kuat dalam tubuh manusia. Otot paha bekerja keras menopang seluruh beban badan saat berlari, menaiki tangga, dan berdiri dari posisi duduk.',
    healthTips: [
      'Lakukan pemanasan peregangan kaki sebelum berlari atau olahraga berat.',
      'Latih kekuatan paha dengan gerakan squat ringan.'
    ],
    funFact: 'Otot paha (kuadrisep) menghasilkan tenaga dorong yang cukup besar untuk membuat manusia melompat tinggi!',
    marker: { x: 44, y: 58 },
    color: '#0ea5e9',
    iconName: 'TrendingUp'
  },
  {
    id: 'lutut',
    name: 'Lutut',
    latinName: 'Genu / Patella',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_lower',
    regionLabel: 'Anggota Gerak Bawah',
    shortDesc: 'Sendi terbesar di tubuh yang meredam benturan saat melangkah dan melompat.',
    fullExplanation:
      'Lutut dilindungi oleh tempurung lutut (patela) dan bantalan tulang rawan bernama meniskus. Sendi lutut memungkinkan kaki menekuk ke belakang saat berjalan dan berlari.',
    healthTips: [
      'Gunakan sepatu yang empuk dan sesuai ukuran saat berolahraga lari.',
      'Jaga berat badan ideal agar beban pada sendi lutut tidak berlebihan.'
    ],
    funFact: 'Bayi baru lahir memiliki tempurung lutut yang masih berupa tulang rawan lunak dan baru mengeras menjadi tulang sejati di usia beberapa tahun!',
    marker: { x: 44, y: 70 },
    color: '#0284c7',
    iconName: 'ShieldAlert'
  },
  {
    id: 'betis',
    name: 'Betis & Tulang Kering',
    latinName: 'Sura / Crus',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_lower',
    regionLabel: 'Anggota Gerak Bawah',
    shortDesc: 'Kaki bagian bawah yang membantu mendorong tubuh saat berjalan dan berlari.',
    fullExplanation:
      'Betis memiliki otot gastroknemius yang terhubung langsung ke tumit melalui tendon terbesar tubuh yaitu Tendon Achilles. Otot ini mengangkat tumit saat kita berjinjit atau melangkah cepat.',
    healthTips: [
      'Pijat ringan dan lakukan peregangan jika betis terasa kaku atau kram.',
      'Cukupkan asupan mineral kalium dan magnesium dari pisang atau sayuran.'
    ],
    funFact: 'Saat berjalan, kontraksi otot betis berfungsi seperti pompa kedua yang membantu mendorong darah balik ke jantung!',
    marker: { x: 43, y: 79 },
    color: '#059669',
    iconName: 'ArrowUp'
  },
  {
    id: 'pergelangan-kaki',
    name: 'Pergelangan Kaki',
    latinName: 'Articulatio Talocruralis',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_lower',
    regionLabel: 'Anggota Gerak Bawah',
    shortDesc: 'Sendi fleksibel yang menghubungkan tungkai bawah dengan telapak kaki.',
    fullExplanation:
      'Pergelangan kaki memungkinkan telapak kaki bergerak naik, turun, dan memutar sedikit untuk beradaptasi dengan permukaan jalan yang tidak rata.',
    healthTips: [
      'Hati-hati saat berjalan di jalanan licin atau berlubang agar terhindar dari cedera terkilir.',
      'Pilih alas kaki yang stabil dan memiliki sol antiselip.'
    ],
    funFact: 'Tendon Achilles di belakang pergelangan kaki mampu menahan beban hingga 3–4 kali berat badan saat berlari!',
    marker: { x: 43, y: 89 },
    color: '#10b981',
    iconName: 'Anchor'
  },
  {
    id: 'kaki',
    name: 'Telapak & Jari Kaki',
    latinName: 'Pes',
    category: 'outer',
    system: 'Sistem Gerak (Rangka & Otot)',
    region: 'limbs_lower',
    regionLabel: 'Anggota Gerak Bawah',
    shortDesc: 'Pondasi utama yang menopang seluruh bobot badan saat berdiri dan melangkah.',
    fullExplanation:
      'Telapak kaki memiliki lengkungan alami (arch) yang berfungsi layaknya pegas peredam guncangan ketika kaki menyentuh tanah. Lima jari kaki membantu menjaga keseimbangan agar tubuh tidak condong ke depan atau ke belakang.',
    healthTips: [
      'Cuci dan keringkan sela-sela jari kaki agar terhindar dari jamur air (kutu air).',
      'Gunakan kaus kaki bersih berbahan katun yang menyerap keringat.'
    ],
    funFact: 'Dalam sehari beraktivitas, sepasang kaki menahan tekanan kumulatif yang setara dengan ratusan ton beban!',
    marker: { x: 42, y: 94 },
    color: '#14b8a6',
    iconName: 'Footprints'
  }
];

export const BODY_SYSTEMS_LIST: { name: string; desc: string; icon: string }[] = [
  {
    name: 'Semua Bagian',
    desc: 'Tampilkan seluruh bagian luar tubuh dan organ dalam.',
    icon: 'Grid'
  },
  {
    name: 'Sistem Sirkulasi (Peredaran Darah)',
    desc: 'Jantung dan pembuluh darah yang mengalirkan nutrisi serta oksigen.',
    icon: 'Heart'
  },
  {
    name: 'Sistem Pernapasan (Respirasi)',
    desc: 'Hidung dan paru-paru untuk pertukaran oksigen dan karbon dioksida.',
    icon: 'Wind'
  },
  {
    name: 'Sistem Pencernaan (Digesti)',
    desc: 'Mulut, lambung, hati, dan usus untuk mengolah makanan menjadi energi.',
    icon: 'Soup'
  },
  {
    name: 'Sistem Koordinasi (Saraf & Indra)',
    desc: 'Otak, mata, telinga, dan indra peraba yang mengatur respon tubuh.',
    icon: 'Brain'
  },
  {
    name: 'Sistem Ekskresi (Pengeluaran)',
    desc: 'Ginjal dan kulit yang membuang zat sisa beracun dari metabolisme.',
    icon: 'Droplets'
  },
  {
    name: 'Sistem Gerak (Rangka & Otot)',
    desc: 'Tulang rangka, sendi, dan otot yang memungkinkan tubuh bergerak aktif.',
    icon: 'Activity'
  }
];
