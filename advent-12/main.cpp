#include <fstream>
#include <functional>
#include <iostream>
#include <string>
#include <vector>
#include <set>

std::vector<std::string> getData(const std::string &);

void first(std::vector<std::string> &data);

void second(std::vector<std::string> &data);

std::string getLowerCaseString(std::string str) {
    auto strLower = str;
    std::transform(str.begin(), str.end(), strLower.begin(),
                   [](unsigned char c) { return tolower(c); });
    return strLower;
}

int main() {
    auto data = getData("data");

    first(data);

    second(data);

    return 0;
}

void second(std::vector<std::string> &data) {
    auto nodes = std::vector<std::pair<std::string, std::string>>();

    for (const auto &node: data) {
        auto pos = node.find('-');
        auto first = node.substr(0, pos);
        auto last = node.substr(pos + 1, node.length());
        nodes.emplace_back(first, last);
    }

    auto paths = std::set<std::vector<std::string>>();

    auto getLowerCaseNodes = [&nodes]() {
        auto lowerCaseNodes = std::set<std::string>();
        for (const auto &node: nodes) {
            auto nodeLower = getLowerCaseString(node.first);
            if (nodeLower == node.first && nodeLower != "start" && nodeLower != "end")
                lowerCaseNodes.insert(nodeLower);

            nodeLower = getLowerCaseString(node.second);
            if (nodeLower == node.second && nodeLower != "start" && nodeLower != "end")
                lowerCaseNodes.insert(nodeLower);
        }

        return lowerCaseNodes;
    };

    auto getConnections = [&nodes](const std::string &node) {
        auto conns = std::vector<std::string>();
        for (const auto &n: nodes) {
            if (node == n.first) {
                conns.emplace_back(n.second);
            }
            if (node == n.second) {
                conns.emplace_back(n.first);
            }
        }
        return conns;
    };

    std::function<void(std::string, std::vector<std::string>, std::string)> findPaths =
            [&findPaths, &paths, &getConnections](const std::string &node, std::vector<std::string> path,
                                                  const std::string &selected) {
                auto conns = getConnections(node);
                for (const auto &conn: conns) {
                    auto connLower = getLowerCaseString(conn);

                    if (conn != connLower || std::find(path.begin(), path.end(), conn) == std::end(path)) {
                        path.emplace_back(conn);
                        if (conn == "end") {
                            paths.insert(path);
                        } else {
                            findPaths(conn, path, selected);
                        }
                        path.pop_back();
                    } else if (conn == selected) {
                        path.emplace_back(conn);
                        findPaths(conn, path, "");
                        path.pop_back();
                    }
                }
            };

    auto path = std::vector<std::string>();

    path.emplace_back("start");

    auto lowerCaseNodes = getLowerCaseNodes();

    for (const auto &node: lowerCaseNodes) {
        findPaths("start", path, node);
    }

    std::cout << paths.size() << '\n';
}

void first(std::vector<std::string> &data) {
    auto nodes = std::vector<std::pair<std::string, std::string>>();

    for (const auto &node: data) {
        auto pos = node.find('-');
        auto first = node.substr(0, pos);
        auto last = node.substr(pos + 1, node.length());
        nodes.emplace_back(first, last);
    }

    auto paths = std::vector<std::vector<std::string>>();

    auto getConnections = [&nodes](const std::string &node) {
        auto conns = std::vector<std::string>();
        for (const auto &n: nodes) {
            if (node == n.first) {
                conns.emplace_back(n.second);
            }
            if (node == n.second) {
                conns.emplace_back(n.first);
            }
        }
        return conns;
    };

    std::function<void(std::string, std::vector<std::string>)> findPaths =
            [&findPaths, &paths, &getConnections](const std::string &node, std::vector<std::string> path) {
                auto conns = getConnections(node);
                for (const auto &conn: conns) {
                    auto connLower = getLowerCaseString(conn);
                    if (conn != connLower || std::find(path.begin(), path.end(), conn) == std::end(path)) {
                        path.emplace_back(conn);
                        if (conn == "end") {
                            paths.push_back(path);
                        } else {
                            findPaths(conn, path);
                        }
                        path.pop_back();
                    }
                }
            };

    auto path = std::vector<std::string>();

    path.emplace_back("start");

    findPaths("start", path);

    std::cout << paths.size() << '\n';
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
