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
	unsigned int start_time =  clock();
	ifstream file(path);
	string current;
	
	while (file.good())
	{
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

	unsigned int end_time = clock();
	cout<<"Total time : "<<end_time - start_time<<endl;
}
	
void CFileReader::FillPhaseList()
{	
	for (list<string>::iterator it = array.begin(); it != array.end(); ++(++it))
	{
		data.phase.push_back(ConvertStringToDouble(*it));
	}
}

void CFileReader::FillFrequencyList()
{
	list<string>::iterator it = array.begin();
	++it;
	for (it; it != array.end(); ++(++it))
	{
		data.frequency.push_back(ConvertStringToDouble(*it));
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
	thread thread1(&CFileReader::GetTextFromFile, this);
	thread thread2(&CFileReader::FillPhaseList, this);
	thread thread3(&CFileReader::FillFrequencyList, this);
	thread1.join();
	thread2.join();
	thread3.join();
	unsigned int end_time = clock();
	cout<<"Total time : "<<end_time - start_time<<endl;
	return data;
}

int _tmain(int argc, _TCHAR* argv[])
{
	CFileReader *fileReaderPtr = new CFileReader();
	CData data;
	fileReaderPtr->SetOscillationNumber();
	data = fileReaderPtr->GetDataObject("F:\\last.txt");
	delete fileReaderPtr;
	/*for (list<double>::iterator it = data.phase.begin(); it != data.phase.end(); ++it)
	{
		cout<<*it<<endl;
	}*/
	system("PAUSE");
	return 0;
}

