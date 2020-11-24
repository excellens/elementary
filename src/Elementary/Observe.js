/*
 * MIT License
 * Copyright (c) 2020 Excellens
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Merge} from "./Base";
import {Collection} from "./Collection";

export function Callback(id, callback) {
    const self = {};

    this.id = !!id
        ? id
        : null;
    this.callback = callback;

    this.getId = function () {
        return this.id;
    };

    this.setId = function (id) {
        this.id = id;
        return this;
    };

    this.hasId = function () {
        return null !== this.id;
    };

    this.update = function (subject) {
        this.callback(subject, this.id);
        return this;
    };

    return Merge(this, self);
}

export function Subject() {
    const self = {};

    this.callbackCollection = new Collection();

    this.attachCallback = function (callback) {
        this.callbackCollection.add(callback);
        return this;
    };

    this.detachCallback = function (callback) {
        this.callbackCollection.remove(callback);
        return this;
    };

    this.notify = function () {
        const subject = this;

        this.callbackCollection.each(function (value, index) {
            value.update(subject);
        });

        return this;
    };

    return Merge(this, self);
}
