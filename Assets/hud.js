#pragma strict
   
public var slider : UnityEngine.UI.Slider;
private var startTime : float;
private var restSeconds = 9999;
function Start () {
	startTime = Time.time;
}

function Update () {
	slider.value = GameObject.FindGameObjectsWithTag("Destroyable").Length;
}

function OnGUI () {
	if (restSeconds > 0)
		restSeconds = 120 - (Time.time - startTime);
	var r = Mathf.CeilToInt(restSeconds);
	
	GUI.Label(Rect(10, 100, 40, 100), String.Format("{0:00}:{1:00}", r/60, r%60));

	if (slider.value == 0 || restSeconds <= 0) {
		var text : String;
		if (restSeconds > 0)
			text = "You Win!";
		else
			text = "Game Over";
		if (GUI.Button(Rect(100,100, 100, 100), text)) {
			Application.Quit();
		}
	}
}
