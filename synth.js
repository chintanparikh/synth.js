function createGain(context, initialGain, connect) {
	connect = ((typeof connect !== 'undefined') ? connect : context.destination);
	gain = context.createGainNode();
	gain.gain.value = initialGain;
	gain.connect(connect	);
	return gain;
}

function createOscillator(context, initialFrequency, gain, type) {
	type = ((typeof type !== 'undefined') ? type : 0);
	osc = context.createOscillator();
	osc.frequency.value = initialFrequency;
	osc.type = type;
	osc.connect(gain);
	return osc;
}

$(document).ready(function() {
	var context = new window.webkitAudioContext();
	var masterGain = createGain(context, parseFloat($("#amplitude").val() / 100))
	var gain1 = createGain(context, parseFloat	($("#wt-position").val()) / 100, masterGain);

	var osc1 = createOscillator(context, parseInt($("#frequency").val()), gain1, parseInt($("#waveform1").val()));

	var gain2 = createGain(context, 1 - (parseFloat($("#wt-position").val()) / 100), masterGain);
	var osc2 = createOscillator(context, parseInt($("#frequency").val()), gain2, parseInt($("#waveform2").val()));

	osc1.start();
	osc2.start();

	$("#wt-position").mousemove(function()
	{
		gain1.gain.value = parseFloat($(this).val()) / 100;
		gain2.gain.value = 1 - (parseFloat($(this).val()) / 100);
	});

	$("#frequency").mousemove(function()
	{
		osc1.frequency.value = parseInt($(this).val());
		osc2.frequency.value = parseInt($(this).val());
	});

	$("#amplitude").mousemove(function()
	{
		masterGain.gain.value = parseFloat($(this).val()) / 100;
	});

	$("#waveform1").change(function()
	{
		osc1.type = parseInt($(this).val());
	});

	$("#waveform2").change(function()
	{
		osc2.type = parseInt($(this).val());
	});
});


