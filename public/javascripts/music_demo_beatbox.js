/* beatbox */
T("audio").load("/timbre.js/misc/audio/drumkit.wav", function() {
  var BD  = this.slice(   0,  500).set({bang:false});
  var SD  = this.slice( 500, 1000).set({bang:false});
  var HH1 = this.slice(1000, 1800).set({bang:false, mul:0.2});
  var HH2 = this.slice(1000, 2200).set({bang:false, mul:0.5});
  var CYM = this.slice(2000).set({bang:false, mul:0.2});
  var scale = new sc.Scale([0,1,3,7,8], 12, "Pelog");

  var P1 = [
    [BD, HH1],
    [HH1],
    [HH2],
    [],
    [BD, SD, HH1],
    [HH1],
    [HH2],
    [SD],
  ].wrapExtend(128);

  var P2 = sc.series(16);

  var drum = T("lowshelf", {freq:300, gain:3, mul:0.8}, BD, SD, HH1, HH2, CYM).play();
  var lead = T("saw", {freq:T("param")});
  var vcf  = T("MoogFF", {freq:250, gain:2, mul:0.9}, lead);
  var env  = T("perc", {r:300});
  var arp  = T("OscGen", {wave:"sin(10)", env:env, mul:0.5});
  var msec  = timbre.timevalue("bpm120 l8");
  var synth = T("OscGen", {env:T("perc", {r:msec, ar:true})});

  T("delay", {time:"BPM128 L4", fb:0.65, mix:0.25}, 
    T("pan", {pos:0.2}, vcf), 
    T("pan", {pos:T("tri", {freq:"BPM64 L1", mul:0.8}).kr()}, arp)
  ).play();

  T("interval", {interval: msec}, function(count) {
    var i = count % P1.length;
    if (i === 0) CYM.bang();

    P1[i].forEach(function(p) { p.bang(); });

    if (Math.random() < 0.015) {
      var j = (Math.random() * P1.length + Math.random() / 5 ) | 0;
      P1.wrapSwap(i, j);
      P2.wrapSwap(i, j);
    }

    var noteNum = scale.wrapAt(P2.wrapAt(count)) + 60;
    if (i % 2 === 0) {
      lead.freq.linTo(noteNum.midicps() * 2, "100ms");
    }
    arp.noteOn(noteNum + 24, 60);
  }).start();
});
