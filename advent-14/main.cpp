#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <map>

std::vector<std::string> getData(const std::string &);

void first(const std::vector<std::string> &data);

int main() {
    auto data = getData("data");

    first(data);

    return 0;
}

std::vector<std::string> getData(const std::string &filename) {
    std::fstream file;
    std::vector<std::string> data;

    file.open(filename, std::ios::in);

    std::string temp;
    if (file) {
        while (std::getline(file, temp, '\n')) {
            data.push_back(temp);
        }
    } else {
        throw std::domain_error("file no found");
    }
    return data;
}

void first(const std::vector<std::string> &data) {
    auto strain = data[0];
    auto rules = std::vector<std::string>(data.cbegin() + 2, data.cend());

    for (int steps = 0; steps < 10; ++steps) {
        for (auto i = 0; i < strain.length() - 1; i++) {
            auto first = strain[i];
            auto second = strain[i + 1];
            for (auto rule: rules) {
                if (rule[0] == first && rule[1] == second) {
                    strain.insert(strain.begin() + i + 1, rule[6]);
                    i++;
                }
            }
        }
    }

    auto chars = std::map<char, int>();
    for (auto c: strain) {
        chars[c]++;
    }

    auto pairCompare = [](std::pair<char, int> lhs, std::pair<char, int> rhs) { return lhs.second < rhs.second; };

    std::cout << std::max_element(chars.cbegin(), chars.cend(), pairCompare)->second -
                 std::min_element(chars.cbegin(), chars.cend(), pairCompare)->second;
}

