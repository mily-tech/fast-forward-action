"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var github = __importStar(require("@actions/github"));
var github_client_wrapper_1 = require("./github_client_wrapper");
var fast_forward_action_1 = require("./fast_forward_action");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var github_token, pr_number, success_message, failure_message, failure_message_same_stage_and_prod, failure_message_diff_stage_and_prod, comment_messages, update_status, set_status, prod_branch, stage_branch, client, fastForward, ff_status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    github_token = core.getInput('GITHUB_TOKEN');
                    pr_number = Number(core.getInput('pull_request_number', { required: true }));
                    success_message = core.getInput('success_message') || "Fast-forward Succeeded!";
                    failure_message = core.getInput('failure_message') || "Fast-forward Failed!";
                    failure_message_same_stage_and_prod = core.getInput('failure_message_same_stage_and_prod') || failure_message;
                    failure_message_diff_stage_and_prod = core.getInput('failure_message_diff_stage_and_prod') || failure_message;
                    comment_messages = {
                        success_message: success_message,
                        failure_message: failure_message,
                        failure_message_same_stage_and_prod: failure_message_same_stage_and_prod,
                        failure_message_diff_stage_and_prod: failure_message_diff_stage_and_prod
                    };
                    update_status = core.getInput('update_status');
                    set_status = update_status === 'true' ? true : false;
                    prod_branch = core.getInput('production_branch') || 'master';
                    stage_branch = core.getInput('staging_branch') || 'staging';
                    client = new github_client_wrapper_1.GitHubClientWrapper(github.context, github_token);
                    fastForward = new fast_forward_action_1.FastForwardAction(client);
                    return [4 /*yield*/, fastForward.async_merge_fast_forward(client, pr_number, set_status)];
                case 1:
                    ff_status = _a.sent();
                    return [4 /*yield*/, fastForward.async_comment_on_pr(client, pr_number, comment_messages, ff_status, prod_branch, stage_branch)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run();
