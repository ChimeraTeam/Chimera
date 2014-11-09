#include "stdafx.h"
#include "CFileReader.h"

using namespace std;

bool CFileReader::isDouble(string str)
{
	for (int i = 0; i < str.length(); i++)
	{
		if (str[i] == '.')
			return true;
	}
	return false;
}

double CFileReader::ConvertStringToDouble(string str)
{
	const char* c_str = new char[str.size() + 1];
	c_str = str.c_str();
	return atof(c_str);
}

void CFileReader::GetTextFromFile()
{
	ifstream file(path);
	string current;
	while (file.good())
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
		if (current.find("0.000000") == 1 || current.find("0.000000") == 2 || current.find("0.000000") == 3)
		{
			data.timeMoment.push_back(ConvertStringToDouble(current));
			continue;
		}
		array.push_back(current);

	}
}
	
void CFileReader::FillPhaseFrequencyList()
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
		i++;
	}
}

CFileReader::~CFileReader()
{
	array.clear();
}
	
void CFileReader::SetOscillationNumber(int number)
{
	oscillationNumber = pow(number, 3);
}
	
CData CFileReader::GetDataObject(char *filepath)
{
	data.oscillationNumber = oscillationNumber;
	path = filepath;
	unsigned int start_time =  clock();
	thread query1(&CFileReader::GetTextFromFile, this);
	thread query2(&CFileReader::FillPhaseFrequencyList, this);
	query1.join();
	query2.join();
	unsigned int end_time = clock();
	cout<<end_time - start_time<<endl;
	return data;
}

int _tmain(int argc, _TCHAR* argv[])
{
	CFileReader *fileReaderPtr = new CFileReader();
	CData data;
	fileReaderPtr->SetOscillationNumber();
	data = fileReaderPtr->GetDataObject("F:\\last.txt");
	delete fileReaderPtr;
	for (list<double>::iterator it = data.timeMoment.begin(); it != data.timeMoment.end(); ++it)
	{
		cout<<*it<<endl;
	}
	cin.get();
	return 0;
}

