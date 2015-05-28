#pragma strict

function Start () {

}

function Update () {

}

function OnGUI() {
	if (GUI.Button(Rect(500,500,1000,100), "Start"))
		Application.LoadLevel("1");
}