"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_client_1 = __importDefault(require("@webwatch/redis-client"));
const bulkRead_1 = __importDefault(require("./bulkRead"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function pusher() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, redis_client_1.default)();
            const websites = yield (0, bulkRead_1.default)();
            console.log("Pushing", websites.length, "websites");
            websites.forEach((website) => {
                client.XADD("websites", "*", {
                    websiteUrl: website.url,
                    websiteId: website.id
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = pusher;
