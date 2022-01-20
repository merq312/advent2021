#include <fstream>
#include <functional>
#include <iostream>
#include <string>
#include <vector>

std::vector<std::string> getData(const std::string &);

int main() {
    auto data = getData("test-data");

    auto nodes = std::vector<std::pair<std::string, std::string>>();

    for (const auto &node: data) {
        auto pos = node.find('-');
        auto first = node.substr(0, pos);
        auto last = node.substr(pos + 1, node.length());
        nodes.emplace_back(first, last);
    }

    auto paths = std::vector<std::vector<std::string>>();

    // FUNC node
    // get all node connections
    // get first non path node (IF not caps), push node to path
    // IF node is end, push path to paths, return
    // IF no valid nodes, return?
    // CALL FUNC with node

    auto getConnections = [&](const std::string &node) {
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

    std::function<void(std::string, std::vector<std::string>)> func =
            [&](const std::string &node, std::vector<std::string> path) {
                auto conns = getConnections(node);
                for (auto conn: conns) {
                    auto conn_lower = conn;
                    std::transform(conn.begin(), conn.end(), conn_lower.begin(),
                                   [](unsigned char c) { return std::tolower(c); });
                    if (conn != conn_lower || std::find(path.begin(), path.end(), conn) == std::end(path)) {
                        path.emplace_back(conn);
                        if (conn == "end") {
                            paths.push_back(path);
                            return;
                        }
                        if (conn.empty()) {
                            return;
                        }
                        func(conn, path);
                    }
                }
            };

    // construct a path
    auto path = std::vector<std::string>();
    // push start to path
    path.emplace_back("start");

    // call FUNC start
    func("start", path);

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
