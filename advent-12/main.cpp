#include <fstream>
#include <functional>
#include <iostream>
#include <string>
#include <vector>

std::vector<std::string> getData(const std::string &);

void first(std::vector<std::string> &data);

int main() {
    auto data = getData("data");

    first(data);

    return 0;
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
                for (auto conn: conns) {
                    auto conn_lower = conn;
                    std::transform(conn.begin(), conn.end(), conn_lower.begin(),
                                   [](unsigned char c) { return tolower(c); });
                    if (conn != conn_lower || std::find(path.begin(), path.end(), conn) == std::end(path)) {
                        path.emplace_back(conn);
                        if (conn == "end") {
                            paths.push_back(path);
                            path.pop_back();
                        } else {
                            findPaths(conn, path);
                            path.pop_back();
                        }
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
