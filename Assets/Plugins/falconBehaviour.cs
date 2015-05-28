using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;
using System.Reflection;
using System.IO;
public class falconBehaviour {
	const string falcon = "Falcon Wrapper";
	public static falconBehaviour main;
	[DllImport(falcon)]
	private static extern void StartHaptics();
	[DllImport(falcon)]
	private static extern void StopHaptics();
	[DllImport(falcon)]
	private static extern bool IsDeviceCalibrated();
	[DllImport(falcon)]
	private static extern bool IsDeviceReady();
	[DllImport(falcon)]
	private static extern double GetXPos();
	[DllImport(falcon)]
	private static extern double GetYPos();
	[DllImport(falcon)]
	private static extern double GetZPos();
	[DllImport(falcon)]
	private static extern void SetServo(double[] speed);
	[DllImport(falcon)]
	private static extern void SetServoPos(double[] pos, double strength);
	[DllImport(falcon)]
	private static extern bool IsHapticButtonDepressed();
	[DllImport(falcon)]
	private static extern int GetButtonsDown();
	[DllImport(falcon)]
	private static extern bool isButton0Down();
	[DllImport(falcon)]
	private static extern bool isButton1Down(); 
	[DllImport(falcon)]
	private static extern bool isButton2Down();
	[DllImport(falcon)]
	private static extern bool isButton3Down();
	public void StartHapticsSystem()
	{
	StartHaptics();
	}
	public IEnumerator InitHapticsSystem()
	{
	while(!IsDeviceCalibrated())
	{
	Debug.LogWarning("Please calibrate the device!");
	yield return new WaitForSeconds(1.5f);
	}
	if(!IsDeviceReady())
	Debug.LogError("Device is not ready!");
	main = this;
	}
	public void applicationQuit ()
	{
	StopHaptics();
	}
	public Vector3 GetServoPos()
	{
	return new Vector3((float)GetXPos(), (float)GetYPos(), -(float)GetZPos() );
	}
	public void SetServo(Vector3 speed)
	{
	double[] _speed = new double[3];
		_speed[0] = speed.x;
		_speed[1] = speed.y;
		_speed[2] = speed.z;
		SetServo(_speed);
	}
	public void SetServoPos(Vector3 pos, double strength){
		double[] _pos = new double[3];
		_pos[0]=pos.x;
		_pos[1]=pos.y;
		_pos[2]=pos.z;
		SetServoPos(_pos,strength);
	}
	 public bool GetIsButton0Down()
	{
		if(isButton0Down())
			return true;
		return false;
	} 
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
