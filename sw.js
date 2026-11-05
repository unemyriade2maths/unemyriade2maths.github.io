// Mode hors ligne du site : garde les pages et fichiers dans le téléphone.
// Liste et version mises à jour par outils/maj-hors-ligne.sh
const VERSION = "202611051713";
const SITE = "site-" + VERSION;
const VOIX = "voix-v1"; // les voix (audio/) sont gardées d'une version à l'autre
const FICHIERS = [
// DEBUT LISTE
  "./",
  "a-propos.html",
  "accompagnement.html",
  "arithmetique.html",
  "assets/audio.js",
  "assets/bilans.js",
  "assets/catalogue.js",
  "assets/clavier.js",
  "assets/contact.js",
  "assets/data.js",
  "assets/diapos.js",
  "assets/exercices.js",
  "assets/exercices2.js",
  "assets/fractions6-p2.js",
  "assets/fractions6-p3.js",
  "assets/fractions6.js",
  "assets/hors-ligne.js",
  "assets/img/calc-cw-de.png",
  "assets/img/calc-cw.png",
  "assets/img/calc-sc-de.png",
  "assets/img/calc-sc.png",
  "assets/lecons.js",
  "assets/logo.png",
  "assets/pythagore.js",
  "assets/scratch/fr.js",
  "assets/scratch/scratchblocks.min.js",
  "assets/style.css",
  "assets/topchrono.js",
  "assets/voix.js",
  "bac.html",
  "bilan.html",
  "brevet.html",
  "chapitre.html",
  "creation-contenu.html",
  "defis.html",
  "enseignants.html",
  "espace.html",
  "exercice-diviseurs.html",
  "exercices.html",
  "index.html",
  "lecon.html",
  "manifest.json",
  "niveau.html",
  "outils.html",
  "revisions.html",
  "topchrono.html",
// FIN LISTE
];
const TOUTES_LES_VOIX = [
// DEBUT VOIX
"audio/014170dda53f.mp3","audio/0216c83c31cf.mp3","audio/0282e0fb4c5e.mp3","audio/02846bd455e8.mp3","audio/029b3acd2bc7.mp3","audio/034f1b1c111e.mp3","audio/03bfe23ac525.mp3","audio/0411cc9f9d7b.mp3","audio/045449264dd0.mp3","audio/046bbd9375b2.mp3","audio/046f659ab95f.mp3","audio/04be4aec8d8d.mp3","audio/0550047fcdf0.mp3","audio/0579cdccb437.mp3","audio/0585b2545468.mp3","audio/05fd7e2f0510.mp3","audio/0666b1c1ec38.mp3","audio/073c9187ad0f.mp3","audio/07ab22f5f388.mp3","audio/084457d5533a.mp3","audio/08e4510d597c.mp3","audio/0913692ab6f3.mp3","audio/0943eacef580.mp3","audio/09a0c0cb8679.mp3","audio/09af742bb0ca.mp3","audio/09b5b9c12987.mp3","audio/0a6515b6ff1e.mp3","audio/0a9b796bb98c.mp3","audio/0a9eb0129c14.mp3","audio/0abaaadd3fbe.mp3","audio/0acd4f2375a3.mp3","audio/0bc291668989.mp3","audio/0c25d3173cbb.mp3","audio/0c542cf980b5.mp3","audio/0cdebac1f323.mp3","audio/0d918bbb0dfe.mp3","audio/0e53951d7f73.mp3","audio/0e9a7b18048a.mp3","audio/0ebc8cce7767.mp3","audio/0f6d0b8dfab4.mp3","audio/1038667fe247.mp3","audio/112f7ef01234.mp3","audio/117a877d8483.mp3","audio/11e4c35b88b3.mp3","audio/12616f997034.mp3","audio/127b66f340d0.mp3","audio/129d5b96de8c.mp3","audio/12c9567cd579.mp3","audio/12eb2a3fb012.mp3","audio/12f25bce1a4a.mp3","audio/136044dc8a02.mp3","audio/13c165f3a57f.mp3","audio/13e6b3705035.mp3","audio/141d7aeabc5b.mp3","audio/142eb0d10f5d.mp3","audio/14db722fd722.mp3","audio/14fb78188874.mp3","audio/14fcfbb4fce5.mp3","audio/150c93e37c4d.mp3","audio/150eeafb6766.mp3","audio/153bd05ed939.mp3","audio/15852e77f7f1.mp3","audio/15b86cc0c5ff.mp3","audio/163ce56c99c7.mp3","audio/1748ee231173.mp3","audio/17859406dcc7.mp3","audio/186c9501fc98.mp3","audio/18d82acbb3c3.mp3","audio/18dc6829405f.mp3","audio/194cad207a36.mp3","audio/199286965138.mp3","audio/1992f4ecd826.mp3","audio/19ad39e666d0.mp3","audio/19c9d70d593e.mp3","audio/19fc63916943.mp3","audio/1a2853111807.mp3","audio/1a3311d79bc4.mp3","audio/1a4b34ad902c.mp3","audio/1aadf81b120e.mp3","audio/1abcf6197446.mp3","audio/1bdad95c5150.mp3","audio/1c1c3a9e560c.mp3","audio/1c3e68436e58.mp3","audio/1c8efa0394fe.mp3","audio/1d4cb81a37d8.mp3","audio/1de4b860ea88.mp3","audio/1e4583cea479.mp3","audio/1f213271f42b.mp3","audio/1f552d340ebb.mp3","audio/1f93ac5572ad.mp3","audio/20e0581348d8.mp3","audio/21360c8ab703.mp3","audio/216865d484d5.mp3","audio/22246759baf5.mp3","audio/223e831506a2.mp3","audio/22896be07b4b.mp3","audio/22e05c4b11d8.mp3","audio/23546c75d5df.mp3","audio/23858fce7753.mp3","audio/23b8499bd308.mp3","audio/23d044094b34.mp3","audio/240cfed0e191.mp3","audio/246c7f6bf5c4.mp3","audio/24d5c78be067.mp3","audio/251c9f801f16.mp3","audio/259e759fdd3a.mp3","audio/25d11153d736.mp3","audio/25e30169daa3.mp3","audio/26613540c0fc.mp3","audio/2685b0e828e5.mp3","audio/26e7e266e367.mp3","audio/26ebc7660136.mp3","audio/270758625f65.mp3","audio/2779a4d06535.mp3","audio/2784668fd5ea.mp3","audio/27982d759973.mp3","audio/27d6dac84c66.mp3","audio/288a06899a95.mp3","audio/297c7340c11d.mp3","audio/29ebe60f7340.mp3","audio/2a3670228205.mp3","audio/2a534ca77f3c.mp3","audio/2ab6e187f59b.mp3","audio/2ac33d73247e.mp3","audio/2b67a256c481.mp3","audio/2b965245b2a8.mp3","audio/2bf0a01ba55f.mp3","audio/2c6dfef0d72f.mp3","audio/2ce9a1bfa3f3.mp3","audio/2cef103c4532.mp3","audio/2d109060fcbf.mp3","audio/2dad26bc45b5.mp3","audio/2dc7f2b8978e.mp3","audio/2e005898e0f8.mp3","audio/2e0518f3f031.mp3","audio/2e48e41e2f3a.mp3","audio/2e8296f97c92.mp3","audio/2eff78f19405.mp3","audio/2f14d071b306.mp3","audio/2f2961514952.mp3","audio/2fb31c7be170.mp3","audio/300330aa7cce.mp3","audio/304a928d6335.mp3","audio/30e2cf3a92d4.mp3","audio/3116feb54819.mp3","audio/325cdaae804a.mp3","audio/32a5419ca2e2.mp3","audio/336f317c410a.mp3","audio/33f7faade012.mp3","audio/33fad4dbb25b.mp3","audio/34270740c71e.mp3","audio/344c1dc64d9e.mp3","audio/34771d31f5d0.mp3","audio/34aefd4ddca4.mp3","audio/34cc3f4d02ca.mp3","audio/35423f8e96e2.mp3","audio/3560274ba32c.mp3","audio/3608e10459ff.mp3","audio/3615c4f720f2.mp3","audio/362d3764c9eb.mp3","audio/365accc6ced0.mp3","audio/36ad5ef1e0be.mp3","audio/36c36f63048d.mp3","audio/370d1e5312b1.mp3","audio/37398981ce3c.mp3","audio/3821ad3f39c3.mp3","audio/38a179e8ec4a.mp3","audio/38e47155887a.mp3","audio/391d0e248012.mp3","audio/39204ed176e9.mp3","audio/3944a094393e.mp3","audio/39977648173b.mp3","audio/3bc7d6a386f1.mp3","audio/3bf527548169.mp3","audio/3c21250e5910.mp3","audio/3c5d427a4c64.mp3","audio/3c6e248086a8.mp3","audio/3c8f680355a4.mp3","audio/3cd173df5f69.mp3","audio/3d59c215ce51.mp3","audio/3d9c83a9c5e9.mp3","audio/3e0772e23967.mp3","audio/3e4966e5293a.mp3","audio/3e4e1409615c.mp3","audio/3e5827dc6c64.mp3","audio/3ed16e58874d.mp3","audio/3f25976e1e60.mp3","audio/3f79425c0b87.mp3","audio/3f99b794e013.mp3","audio/3fc4aaf9f241.mp3","audio/40c2f0e7d0b2.mp3","audio/4101d7ab9d09.mp3","audio/41bc2f0daf22.mp3","audio/41bff8b745a2.mp3","audio/41d6da7b7937.mp3","audio/41f8b51526a7.mp3","audio/4214b77ee9ef.mp3","audio/424112d03452.mp3","audio/4272eb74cea3.mp3","audio/42757dc4409d.mp3","audio/4280d477e1fe.mp3","audio/42bb4d4e886d.mp3","audio/43d21654bc73.mp3","audio/440036cb996f.mp3","audio/4476db37b9ba.mp3","audio/4502a4b6d139.mp3","audio/45362612e112.mp3","audio/458e02eb8fcb.mp3","audio/45a8b3b8ac39.mp3","audio/45ece84275c7.mp3","audio/4655d6f3cd6a.mp3","audio/46cb2b6a5cc0.mp3","audio/46fe2444ffd0.mp3","audio/47567d44e4c0.mp3","audio/478dbc61751e.mp3","audio/485c524fb88c.mp3","audio/486704d6c452.mp3","audio/493721728dfa.mp3","audio/493ab768e24c.mp3","audio/49732e597bee.mp3","audio/49e343c615fd.mp3","audio/49ffc55355f2.mp3","audio/4b002b535f61.mp3","audio/4b111eb9da40.mp3","audio/4b149c27bb20.mp3","audio/4b454174f2f1.mp3","audio/4b6ba5ef87ec.mp3","audio/4c66a38882db.mp3","audio/4d4354686cce.mp3","audio/4dfe7203586e.mp3","audio/4e5a7b6d625f.mp3","audio/4e98ec6b64c5.mp3","audio/4ed82c73fc4a.mp3","audio/4f81cffff833.mp3","audio/4fd889a96826.mp3","audio/504a7c789402.mp3","audio/5097086bebd0.mp3","audio/50a3ca9213fa.mp3","audio/515e55d839fb.mp3","audio/51abdeae3365.mp3","audio/5221b688034c.mp3","audio/52571ced2a11.mp3","audio/52a92052f64b.mp3","audio/53e0018771fb.mp3","audio/5435338af22d.mp3","audio/54b03e35b757.mp3","audio/5549be59ef29.mp3","audio/5610a73b29d0.mp3","audio/561f36705fcc.mp3","audio/56c7c320a0ab.mp3","audio/57752c800f59.mp3","audio/5780b44024f3.mp3","audio/57bd2a3ca41b.mp3","audio/57cccb21980d.mp3","audio/587cf98740eb.mp3","audio/592850b1613c.mp3","audio/594a47e1a347.mp3","audio/598db80d2030.mp3","audio/59c97c4da912.mp3","audio/59d4e134daeb.mp3","audio/59e71fc91ee3.mp3","audio/5a07e5880c69.mp3","audio/5a6cb60faa45.mp3","audio/5a766a22365d.mp3","audio/5a8b54eed662.mp3","audio/5a9a4355207c.mp3","audio/5b1cd5084d3b.mp3","audio/5b36ce0c51a6.mp3","audio/5b823b31e955.mp3","audio/5ba857a5203f.mp3","audio/5c1511a5b66e.mp3","audio/5c4e9004b482.mp3","audio/5cddf69a5f35.mp3","audio/5cfcfd211229.mp3","audio/5d76c90b2531.mp3","audio/5dd316eca1af.mp3","audio/5e22bc33fd5b.mp3","audio/5e592a0923be.mp3","audio/5ea170af2335.mp3","audio/5ecff1d99b23.mp3","audio/605ec56518ef.mp3","audio/60dabe6a9801.mp3","audio/61fd61602572.mp3","audio/627c7e1394ad.mp3","audio/628c1a3374c1.mp3","audio/6292ee812649.mp3","audio/62c9097837af.mp3","audio/636db5fa7878.mp3","audio/639fb584e75b.mp3","audio/64616e7be1e0.mp3","audio/6485c75210ef.mp3","audio/64b8999f77e8.mp3","audio/6515f79714b3.mp3","audio/6559a3fdb81a.mp3","audio/6572aa440ca1.mp3","audio/65f80a9415cd.mp3","audio/6665d8b20871.mp3","audio/66aedd6f0365.mp3","audio/6700062522d3.mp3","audio/675e0cf91121.mp3","audio/67724e3db3a9.mp3","audio/67790b252f1e.mp3","audio/67a5aa493ec2.mp3","audio/67cf3144fe89.mp3","audio/67eb3400eb6b.mp3","audio/69175a35b96c.mp3","audio/69c3eb4fb725.mp3","audio/69e7fa9a6332.mp3","audio/6a2225c2efab.mp3","audio/6abe4a13a0f9.mp3","audio/6acdf01b8093.mp3","audio/6aee2b0c8072.mp3","audio/6b52f31ffa7e.mp3","audio/6b6062e4704a.mp3","audio/6bbb9ee6c645.mp3","audio/6bc002921385.mp3","audio/6bf28f2a0017.mp3","audio/6c9b0d616fe8.mp3","audio/6c9e3357f35d.mp3","audio/6cc6320c44f6.mp3","audio/6dd3034a3816.mp3","audio/6e227de25edb.mp3","audio/6eaf6cca9685.mp3","audio/6eb107befe88.mp3","audio/6ee7079b58cb.mp3","audio/6efe1be60861.mp3","audio/6f529caf0135.mp3","audio/7069ff902bfd.mp3","audio/707530aeea76.mp3","audio/70ad55f389de.mp3","audio/70cfbd8ff9da.mp3","audio/714324cca6fd.mp3","audio/7263fcdd0d0c.mp3","audio/7375f5e8c05d.mp3","audio/7390f4a3a14f.mp3","audio/74b65e22915f.mp3","audio/756608cca886.mp3","audio/758bf4119e6a.mp3","audio/75ca405c3885.mp3","audio/764ea45c30be.mp3","audio/76895feafb4f.mp3","audio/77220face20c.mp3","audio/779853218a1a.mp3","audio/79638d0cd76c.mp3","audio/7a09012adba6.mp3","audio/7a13f84a1d68.mp3","audio/7a424f186f5a.mp3","audio/7a7a2da5c583.mp3","audio/7acf4dc538a6.mp3","audio/7b2312407e0c.mp3","audio/7b65210c2359.mp3","audio/7b83f0cf9a30.mp3","audio/7bc69347db43.mp3","audio/7c0b8e219221.mp3","audio/7d8912678c55.mp3","audio/7dc443c9a189.mp3","audio/7dc4ab133afa.mp3","audio/7dcc230e9b9e.mp3","audio/7e45ab533b27.mp3","audio/7eb8464c38c8.mp3","audio/7fe3766d30c9.mp3","audio/803b966f0e19.mp3","audio/80df642b689c.mp3","audio/81392205a83a.mp3","audio/82423262be08.mp3","audio/82d388291c48.mp3","audio/830fcb287fe1.mp3","audio/837f23654baa.mp3","audio/83b8e44e517d.mp3","audio/841fbb66886c.mp3","audio/845669041e85.mp3","audio/848b5658e0ba.mp3","audio/851aff6b1f6a.mp3","audio/8542fdb08ca8.mp3","audio/854bc0dee2bf.mp3","audio/858b08670b29.mp3","audio/85f7ed13d42b.mp3","audio/86390ff3ce2c.mp3","audio/86a471c9c54e.mp3","audio/8735487a8cd9.mp3","audio/87d0b52c6a83.mp3","audio/884c7ac7cb92.mp3","audio/892526f34eaf.mp3","audio/894e8a5daeb6.mp3","audio/896c5616196c.mp3","audio/899065ed3657.mp3","audio/89b0691d6da8.mp3","audio/89b236484c48.mp3","audio/89c66f3f44ac.mp3","audio/89de37c05ac4.mp3","audio/89e7b69c221e.mp3","audio/8a746cf43bb6.mp3","audio/8a9554012187.mp3","audio/8b2277fd44fa.mp3","audio/8b449a9893b5.mp3","audio/8b5a1922ce34.mp3","audio/8bcc6392da5c.mp3","audio/8c036de90e15.mp3","audio/8c4c6d3cd94e.mp3","audio/8c8937a554ee.mp3","audio/8cbd8329a081.mp3","audio/8d33a1537ec4.mp3","audio/8da2e9191b1a.mp3","audio/8df34b4d0e2d.mp3","audio/8e6ca8b1f2d9.mp3","audio/8ea6f56d1c39.mp3","audio/8ef239b548c5.mp3","audio/8f17350e020d.mp3","audio/8f52dbe05868.mp3","audio/8f99b7860869.mp3","audio/8fa40425ba66.mp3","audio/9005701cc1e0.mp3","audio/900878dfe867.mp3","audio/90ea2ebc7012.mp3","audio/916cf5f487f5.mp3","audio/917fdec5f75e.mp3","audio/91a1fda71ac3.mp3","audio/920ef786b619.mp3","audio/9268bfb80b22.mp3","audio/92ac0cc6b43f.mp3","audio/936d3afc1081.mp3","audio/93cc4bcd8e27.mp3","audio/94394c9314be.mp3","audio/9614b9ce1e36.mp3","audio/961d174e3d5b.mp3","audio/969c5e5f562e.mp3","audio/96ce5e005ee1.mp3","audio/96f944b43d09.mp3","audio/97ad74bba10b.mp3","audio/97ea4d27b5a3.mp3","audio/9827732fc4fc.mp3","audio/9900a2b24387.mp3","audio/99170bf180bf.mp3","audio/99a92f30a78b.mp3","audio/9a015c6a11dd.mp3","audio/9a1d8e896208.mp3","audio/9a5da2c811ae.mp3","audio/9b14ffefe159.mp3","audio/9b48159a2e86.mp3","audio/9c17f1bedfa5.mp3","audio/9ca56aad1fcd.mp3","audio/9d9bf021f8d8.mp3","audio/9e2dfd89e39f.mp3","audio/9f62a50e773d.mp3","audio/9fb7a7f4de6f.mp3","audio/9ffb143717cb.mp3","audio/a09fc9244f79.mp3","audio/a0b36c5719ae.mp3","audio/a1bdb19b7cb0.mp3","audio/a1cfcb9265aa.mp3","audio/a201be5228f0.mp3","audio/a2368b1fae0b.mp3","audio/a30d9508a89e.mp3","audio/a34ba0850b96.mp3","audio/a40987bdd399.mp3","audio/a40ce8f1f7e0.mp3","audio/a461f32e3fe7.mp3","audio/a476ce830e54.mp3","audio/a51b4e0bd647.mp3","audio/a5805d521d95.mp3","audio/a69257c54e1a.mp3","audio/a6f474f6dcb4.mp3","audio/a73464a852cf.mp3","audio/a7fea9d451b2.mp3","audio/a80ad2a82546.mp3","audio/a81acadd6d79.mp3","audio/a85e1c2975cd.mp3","audio/a8fbc78c9387.mp3","audio/a94498c8a18e.mp3","audio/a97e4b4eaefc.mp3","audio/a9ca9b9b59b3.mp3","audio/aa9328a5ab3b.mp3","audio/aa9329564cd7.mp3","audio/aab684ccea73.mp3","audio/aad723ce0ce7.mp3","audio/aaed8b985e1c.mp3","audio/acc589f090d4.mp3","audio/ad1d9cd9fb22.mp3","audio/ad2c4740ce9d.mp3","audio/ad3ca420530c.mp3","audio/ad78469f2a8b.mp3","audio/ad792a39d429.mp3","audio/adad7ff749df.mp3","audio/add4d6efbd38.mp3","audio/ae3f0a647cc0.mp3","audio/ae9e6469c297.mp3","audio/aeaa1a469e66.mp3","audio/af417cabbeb4.mp3","audio/af5d36dbaf1e.mp3","audio/af64560fcdc7.mp3","audio/af7a279fce99.mp3","audio/af9876cf7559.mp3","audio/b034f50295cb.mp3","audio/b0619515e1fb.mp3","audio/b070e0158895.mp3","audio/b08e9e462486.mp3","audio/b09f69ad56f8.mp3","audio/b0b3e1808547.mp3","audio/b1506c06bef8.mp3","audio/b1a83d1ef722.mp3","audio/b1b7188a21f3.mp3","audio/b2a0c3ffcb56.mp3","audio/b31a1fead0a5.mp3","audio/b3f3535a080f.mp3","audio/b41286263165.mp3","audio/b42179669734.mp3","audio/b45f8af32e48.mp3","audio/b4ac48263b3a.mp3","audio/b4f728b54c14.mp3","audio/b7131dffdb0b.mp3","audio/b753b60c97fc.mp3","audio/b77c9a46dd25.mp3","audio/b786b8681544.mp3","audio/b7fac3775900.mp3","audio/b7fd9292c3d7.mp3","audio/b87318b13234.mp3","audio/b8e249503c7d.mp3","audio/b8eb069b6946.mp3","audio/b93e61cb41ec.mp3","audio/b96ededdc02e.mp3","audio/b9d2adb29128.mp3","audio/baeee458d0aa.mp3","audio/bb930b973d06.mp3","audio/bb98ab7d843d.mp3","audio/bc62afae1cf8.mp3","audio/bcb9b40633d6.mp3","audio/bd099150b3e8.mp3","audio/bdcf12868845.mp3","audio/be56c4ee6388.mp3","audio/be7e9e3c3813.mp3","audio/beba67a75d1f.mp3","audio/bec88666e81d.mp3","audio/beeb71a193f0.mp3","audio/bf1555d7a71a.mp3","audio/bf79273eab91.mp3","audio/bfb4bd6a30b2.mp3","audio/bfdbdee7dc76.mp3","audio/c00842a40a3f.mp3","audio/c068eb4241ee.mp3","audio/c08538426c29.mp3","audio/c0ed3ec4121e.mp3","audio/c116d3dc3eca.mp3","audio/c146f2fe0335.mp3","audio/c1d8ce822c1e.mp3","audio/c1f4c459d6c8.mp3","audio/c212ffdf2c98.mp3","audio/c217fc7d41eb.mp3","audio/c25fd6fb8913.mp3","audio/c27414c6032c.mp3","audio/c345ca3015fe.mp3","audio/c3957b01e247.mp3","audio/c3c7a3ba305a.mp3","audio/c40eac66a788.mp3","audio/c43bc5de1e18.mp3","audio/c44926386cd9.mp3","audio/c4cfe66e5bac.mp3","audio/c50964899063.mp3","audio/c515ce8d9647.mp3","audio/c515dfc6d943.mp3","audio/c5598cadbdc6.mp3","audio/c581800a8dce.mp3","audio/c58aa115430a.mp3","audio/c590fa2096ec.mp3","audio/c6b7beb97ec1.mp3","audio/c6cbb29c2913.mp3","audio/c757094862d1.mp3","audio/c89b57a1b079.mp3","audio/c9359dc76105.mp3","audio/c98be017c934.mp3","audio/c99bda44274d.mp3","audio/c9c5c44b092f.mp3","audio/ca2ff2b88ce5.mp3","audio/cb4f92133699.mp3","audio/cc12e040cadd.mp3","audio/cc7f8fd6a161.mp3","audio/cc8b6c9dd8db.mp3","audio/ccaecac1dbc3.mp3","audio/ccf6ad65d72a.mp3","audio/cd1612a91776.mp3","audio/cd725bb7c727.mp3","audio/cd8048877bf0.mp3","audio/cda3539e978c.mp3","audio/ce5134b0ad2c.mp3","audio/cea53af6edaa.mp3","audio/cfbd8b020e54.mp3","audio/cfd55c320811.mp3","audio/d0ad6bd1f923.mp3","audio/d0d459b95cdd.mp3","audio/d0ee14d234fd.mp3","audio/d0eefaa6867a.mp3","audio/d1253a22ece1.mp3","audio/d2adba49454c.mp3","audio/d308203738c5.mp3","audio/d41a11a56556.mp3","audio/d4d275994356.mp3","audio/d502ce94895f.mp3","audio/d53c976a8b31.mp3","audio/d5b0e4636d3c.mp3","audio/d5f7fe9d5ff9.mp3","audio/d623cadf110b.mp3","audio/d67baaeb1241.mp3","audio/d6b21a287475.mp3","audio/d7203b27d598.mp3","audio/d731f7d2e909.mp3","audio/d7bd26ec47bb.mp3","audio/d85fe4d91277.mp3","audio/d881fd3eede3.mp3","audio/d8f11cf4ae29.mp3","audio/d918fb6ac389.mp3","audio/d92bb089c373.mp3","audio/d9e134a915fb.mp3","audio/da298911a7ef.mp3","audio/da63606894d7.mp3","audio/dadd27b83e49.mp3","audio/dbba470f8464.mp3","audio/dc1dc430dd48.mp3","audio/dc2570f6a673.mp3","audio/dc7956191cd4.mp3","audio/dd5d6edb1955.mp3","audio/de88c9c563e9.mp3","audio/deae673d1211.mp3","audio/df2b35cc9ce3.mp3","audio/df5a735d44dd.mp3","audio/e123e6da691f.mp3","audio/e1710dec663f.mp3","audio/e215f9afa389.mp3","audio/e2bfbbe989e6.mp3","audio/e2e37a4c5dff.mp3","audio/e35429c08da4.mp3","audio/e38eb9156b95.mp3","audio/e400458a3cae.mp3","audio/e4374f2ec815.mp3","audio/e46cbb7cf569.mp3","audio/e4e5ab154968.mp3","audio/e55d5583d6a2.mp3","audio/e59798d5006a.mp3","audio/e5d89f8fa31d.mp3","audio/e5de32dc323c.mp3","audio/e618d2ce66c7.mp3","audio/e6794fed29c8.mp3","audio/e68564547e62.mp3","audio/e6c679825745.mp3","audio/e724246e2679.mp3","audio/e732ae2771a4.mp3","audio/e758076f6577.mp3","audio/e8148cddbe16.mp3","audio/e889b764114d.mp3","audio/e8cd04a5a335.mp3","audio/e95e5500a3e0.mp3","audio/eaee98cf4b72.mp3","audio/eb2976486ddb.mp3","audio/eb535942b400.mp3","audio/ebd20b1bcdc0.mp3","audio/ebd2c54f3161.mp3","audio/ec79e2e0d1e9.mp3","audio/ed620d1a483c.mp3","audio/ed63adf04716.mp3","audio/ef1683b5f44d.mp3","audio/ef711ec543f9.mp3","audio/f04cefc22088.mp3","audio/f09e960da5dc.mp3","audio/f0f5d0da73ab.mp3","audio/f12b9e476359.mp3","audio/f16d9a5a98e2.mp3","audio/f1a09edb8e55.mp3","audio/f210e77b2939.mp3","audio/f218b7533ea7.mp3","audio/f234a707bebc.mp3","audio/f28d94c4014d.mp3","audio/f3019e3ccb8c.mp3","audio/f31e9b4377c0.mp3","audio/f35bfdddaf33.mp3","audio/f37fa40e1106.mp3","audio/f3872b09e44e.mp3","audio/f4b0ca0b3df3.mp3","audio/f4b2f6a4f973.mp3","audio/f5123dfcbefc.mp3","audio/f51a8fa5bbc1.mp3","audio/f55130ed90cc.mp3","audio/f5c69d9fa671.mp3","audio/f5f7f2686a97.mp3","audio/f5fb19530d0e.mp3","audio/f6089c3d1ea3.mp3","audio/f6706ff340f3.mp3","audio/f6ee48e0efe2.mp3","audio/f70b98dbb4b5.mp3","audio/f7135b89b50c.mp3","audio/f71c5fdf8be7.mp3","audio/f72dd3be9c49.mp3","audio/f7e9ef2d36aa.mp3","audio/f8a7d99798bd.mp3","audio/f8f8f6330858.mp3","audio/f955b112eef0.mp3","audio/f9662685d22e.mp3","audio/fa6145ec7acc.mp3","audio/fa86065a4159.mp3","audio/fb9845f6bcc0.mp3","audio/fbe6c89c76fb.mp3","audio/fc065c5cfe9e.mp3","audio/fc3120f3594e.mp3","audio/fcdacf9a88d5.mp3","audio/fd01ca1169f7.mp3","audio/fdb4a8720a26.mp3","audio/fde19370fa0f.mp3","audio/fe092dd2931b.mp3","audio/fe3ef1238314.mp3","audio/fe3f77b30c77.mp3","audio/fee656690701.mp3","audio/ff27129152ac.mp3","audio/ffad9719c329.mp3","audio/ffda726c5247.mp3","audio/ffe6b4a0f5f6.mp3",
// FIN VOIX
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SITE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(noms => Promise.all(
    noms.filter(n => n !== SITE && n !== VOIX).map(n => caches.delete(n))
  )).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // YouTube : en ligne seulement

  // Voix : d'abord dans le téléphone, sinon téléchargée puis gardée.
  if (url.pathname.includes("/audio/")) {
    e.respondWith(caches.open(VOIX).then(c => c.match(req).then(r => r || fetch(req).then(rep => {
      if (rep.ok) c.put(req, rep.clone());
      return rep;
    }))));
    return;
  }

  // Pages et fichiers : réponse immédiate depuis le téléphone,
  // et mise à jour discrète en arrière-plan quand il y a du réseau.
  e.respondWith(caches.open(SITE).then(async c => {
    const enCache = await c.match(req, { ignoreSearch: true });
    const reseau = fetch(req).then(rep => {
      if (rep.ok) c.put(new Request(url.origin + url.pathname), rep.clone());
      return rep;
    }).catch(() => null);
    if (enCache) { e.waitUntil(reseau); return enCache; }
    return (await reseau) || (await c.match("./")) || new Response("Hors ligne", { status: 503 });
  }));
});

// Bouton « télécharger toutes les voix »
self.addEventListener("message", e => {
  if (!e.data || e.data.type !== "voix") return;
  const liste = TOUTES_LES_VOIX, src = e.source;
  e.waitUntil(caches.open(VOIX).then(async c => {
    let fait = 0;
    for (let i = 0; i < liste.length; i += 6) {
      await Promise.all(liste.slice(i, i + 6).map(async f => {
        if (!(await c.match(f))) { try { await c.add(f); } catch (_) {} }
        fait++;
      }));
      src.postMessage({ type: "voix", fait, total: liste.length });
    }
  }));
});
