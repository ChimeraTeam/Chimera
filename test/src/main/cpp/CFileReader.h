#pragma once

#include "stdafx.h"
#include "CData.h"

using namespace std;

class CFileReader
{
private: 
	int oscillationNumber;
	list<string> array;
	CData data;
	char *path;
	bool isDouble(string str);
	double ConvertStringToDouble(string str);
	void GetTextFromFile();
	void FillPhaseFrequencyList();
public:
	~CFileReader();
	void SetOscillationNumber(int number = 50);
	CData GetDataObject(char *filepath);
};