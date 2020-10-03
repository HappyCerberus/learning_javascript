import * as backbone from "./backbone/backbone"
import * as inbound from "./backbone/inbound_module"
import * as outbound from "./backbone/outbound_module"

backbone.run();
inbound.run("cat", "tcp://127.0.0.1:3001");
inbound.run("dog", "tcp://127.0.0.1:3002");
outbound.run("listener");
