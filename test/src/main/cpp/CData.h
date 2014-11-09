#pragma once

#include "stdafx.h"

using namespace std;

class CData
{
public:
	list<double> phase;
	list<double> frequency;
	list<double> timeMoment;
	int oscillationNumber;
	~CData()
	{
		phase.clear();
		frequency.clear();
		timeMoment.clear();
	}
};
