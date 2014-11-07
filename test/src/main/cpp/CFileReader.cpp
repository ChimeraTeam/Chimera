#include <iostream>
#include <list>
#include <fstream>
#include <string>
#include <math.h>
#include <stdlib.h>     

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

class CFileReader
{
private: 
	int oscillationNumber;
	list<string> array;
	CData data;
	bool isDouble(string str)
	{
		for (int i = 0; i < str.length(); i++)
		{
			if (str[i] == '.')
				return true;
		}
		return false;
	}

	double ConvertStringToDouble(string str)
	{
		char* c_str = new char[str.size() + 1];
		copy(str.begin(), str.end(), c_str);
		return atof(c_str);
	}

	void GetTextFromFile(char* path)
	{
		ifstream file(path);
		string current;
		while (true)
		{
			if (file.eof())
			{
				break;
			}
			file >> current;
			if (current == "[" || current == "]" || !isDouble(current))
			{
				continue;
			}
			array.push_back(current);
		}
	}
	
	void FillTimeMomentList()
	{
		int i = 0;
		for (list<string>::iterator it = array.begin(); it != array.end(); ++it)
		{
			if (i == 0 || i % oscillationNumber == 0)
			{
				/*data.timeMoment.push_back(ConvertStringToDouble(*it));
				array.erase(it);
				--it;*/
			}
			i++;
		}
	}
	
	void FillPhaseFrequencyList()
	{
		int i = 0;
		for (list<string>::iterator it = array.begin(); it != array.end(); ++it)
		{
			if (i % 2 == 0)
			{
				data.phase.push_back(ConvertStringToDouble(*it));
			}
			else
			{
				data.frequency.push_back(ConvertStringToDouble(*it));
			}
		}
		array.clear();
	}
	
public:
	
	~CFileReader()
	{
		array.clear();
	}
	
	void SetOscillationNumber(int number = 50)
	{
		oscillationNumber = pow(number, 3);
	}
	
	CData GetDataObject(char *path)
	{
		GetTextFromFile(path);
		FillTimeMomentList();
		FillPhaseFrequencyList();
		return data;
	}
};

int main(int argc, char** argv) {
	CFileReader *fileReaderPtr = new CFileReader();
	CData data;
	fileReaderPtr->SetOscillationNumber();
	data = fileReaderPtr->GetDataObject("F:\\last.txt");
	delete fileReaderPtr;
	for (list<double>::iterator it = data.phase.begin(); it != data.phase.end(); ++it)
	{
		cout<<*it<<endl;
	}
	return 0;
}
