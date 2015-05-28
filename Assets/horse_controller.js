#pragma strict
public var soundWhip : AudioSource;
public var soundWhinny : AudioSource;
public var fpsCamera : GameObject;

private var plugin: falconBehaviour = new falconBehaviour();

private var speed = 10;

private var frames = 100;
private var frame_delta = -1;
private var cooldown : float;

function Start () {
	plugin.StartHapticsSystem();
	StartCoroutine(plugin.InitHapticsSystem());
	
	cooldown = Time.time;
} 

function Update () {
	transform.Translate(Vector3.forward * speed * Time.deltaTime);
	
	//if (plugin.GetIsButton0Down()) {
		//speed *= 1.1;
//	}

	var anim = transform.GetChild(1).GetComponent.<Animator>();
	anim.speed = speed / 20.0;
	
	//transform.GetChild(0).transform.position = Vector3(transform.position.x,
		//transform.position.y + Mathf.Min(Mathf.Max(1.2, speed/20.0), 2) + 0.3* frames/100.0, transform.position.z);
	
	fpsCamera.transform.Rotate(Vector3.right * frames / 2.0 * Time.deltaTime);
	//fpsCamera.transform.localEulerAngles += new Vector3(frames / 10.0, 0);
}

function OnApplicationQuit () {
	plugin.applicationQuit(); 
}

function FixedUpdate ()
{
	var currentServoPos : Vector3 = plugin.GetServoPos();
	
	if (frames < -100 || frames > 100) {
		frame_delta = -1 * frame_delta;
	}
	frames += frame_delta * speed;

	plugin.SetServo(Vector3.up * frames / 30.0);
	//fpsCamera.transform.Rotate(Vector3.right * Time.deltaTime * frames / 10.
	
	if (currentServoPos.z < -1.4) {
		if (Time.time > cooldown)
			if (speed > 10){
				speed -= 6;
				cooldown = Time.time + 1;
				soundWhinny.Play();
			} else {
			frames = 0;
				if (speed != 0)
					soundWhinny.Play();
				speed = 0;
				transform.GetChild(1).audio.Stop();
			}
		
		
	} else if (currentServoPos.z> 1.4) {
		if (Time.time > cooldown) {
			if (speed == 0){
				transform.GetChild(1).audio.Play();
				speed += 3;
			}
			//if (speed < 20)
				speed += 3;
			soundWhip.Play();
		}
		cooldown = Time.time + 1;
	}
	
	if (speed > 0)
		transform.Rotate(Vector3.up * Time.deltaTime * (currentServoPos.x / 1.9) * 100);
} 
