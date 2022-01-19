#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>

std::vector<std::vector<int>> getData(const std::string &);

int main() {
    auto data = getData("test-data");



    return 0;
}

std::vector<std::vector<int>> getData(const std::string &filename) {
    std::fstream file;
    std::vector<std::vector<int>> data;

    file.open(filename, std::ios::in);

    std::string line;
    if (file) {
        while (std::getline(file, line, '\n')) {
            data.emplace_back();
            for (auto ch : line) {
                data.back().emplace_back(std::atoi(&ch));
            }
        }
    } else {
        throw std::domain_error("file no found");
    }
    return data;
}