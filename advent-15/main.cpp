#include <fstream>
#include <iostream>
#include <map>
#include <optional>
#include <set>
#include <string>
#include <vector>

std::vector<std::vector<int>> getData(const std::string &);

std::vector<std::vector<int>>
transformGrid(const std::vector<std::vector<int>> &);

int main() {
    auto subGrid = getData("data");
    auto grid = transformGrid(subGrid);

    typedef std::pair<int, int> vertex;

    // < Coordinate :  < min steps (cumulative risk), last coordinate in path >>
    auto vertexTable =
            std::map<vertex, std::pair<std::optional<int>, std::optional<vertex>>>();

    auto visited = std::set<vertex>();

    // TODO: this can be a min-heap for better performance
    auto unvisited = std::set<vertex>();

    auto rowMax = grid.size();
    auto colMax = grid[0].size();

    for (auto row = 0; row < rowMax; row++) {
        for (auto col = 0; col < colMax; col++) {
            auto vert = vertex(row, col);
            vertexTable[vert] = std::pair(std::nullopt, std::nullopt);
        }
    }

    visited.insert(vertex(0, 0));
    vertexTable[vertex(0, 0)].first = grid[0][0];
    auto currentVertex = vertex(0, 0);

    for (;;) {
        auto row = currentVertex.first;
        auto col = currentVertex.second;
        auto adjVertex = std::vector<vertex>();

        // get non-border adjacent nodes
        for (auto i : {col - 1, col + 1}) {
            if (i >= 0 && i < colMax) {
                adjVertex.emplace_back(row, i);
            }
        }
        for (auto i : {row - 1, row + 1}) {
            if (i >= 0 && i < rowMax) {
                adjVertex.emplace_back(i, col);
            }
        }

        // calculate RISK to adjacent nodes, update vertexTable if new RISK less
        // than known minimum min RISK to current position + node RISK
        for (auto ea : adjVertex) {
            auto risk = vertexTable[vertex(row, col)].first.value() +
                        grid[ea.first][ea.second];
            auto &knownMinRisk = vertexTable[vertex(ea.first, ea.second)].first;
            auto &prevVertex = vertexTable[vertex(ea.first, ea.second)].second;
            if (!knownMinRisk.has_value() || risk < knownMinRisk) {
                knownMinRisk = risk;
                prevVertex = vertex(row, col);
                unvisited.insert(ea);
            }
        }

        // go to nearest UNVISITED node (find the lowest Risk in the vertex table
        // that is not in visited)
        auto nearestUnvisited = std::optional<vertex>(std::nullopt);
        auto nearestUnvisitedRisk = std::optional<int>(std::nullopt);

        for (const auto &coord : unvisited) {
            const auto &info = vertexTable[coord];
            if (!visited.contains(coord) && info.first != std::nullopt) {
                if (!nearestUnvisitedRisk.has_value() ||
                    info.first < nearestUnvisitedRisk) {
                    nearestUnvisited = vertex(coord.first, coord.second);
                    nearestUnvisitedRisk = info.first;
                }
            }
        }

        visited.insert(nearestUnvisited.value());
        unvisited.erase(nearestUnvisited.value());
        currentVertex = nearestUnvisited.value();

        // break if all vertexes have been visited
        if (visited.size() == colMax * rowMax) {
            break;
        }
        // break if all remaining vertexes have lowest possible risk
        if (!nearestUnvisited.has_value()) {
            break;
        }
    }

    // solution doesn't include the "risk" for the starting cell (0,0)
    std::cout << vertexTable[vertex(rowMax - 1, colMax - 1)].first.value() -
                 vertexTable[vertex(0, 0)].first.value()
              << '\n';

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

std::vector<std::vector<int>>
transformGrid(const std::vector<std::vector<int>> &grid) {
    auto rowMax = grid.size();
    auto colMax = grid[0].size();
    auto newRowMax = 5 * grid.size();
    auto newColMax = 5 * grid[0].size();

    auto newGrid =
            std::vector<std::vector<int>>(newColMax, std::vector<int>(newRowMax, 0));

    for (auto row = 0; row < newRowMax; row++) {
        for (auto col = 0; col < newColMax; col++) {
            const int modifier = row / rowMax + col / colMax;
            int moddedGridValue = grid[row % rowMax][col % colMax] + modifier;
            if (moddedGridValue > 9) {
                moddedGridValue -= 9;
            }
            newGrid[row][col] = moddedGridValue;
        }
    }

    return newGrid;
}