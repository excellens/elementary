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

export function Collection(list) {
    const self = {};

    this.list = !!list
        ? list
        : [];

    this.add = function (index, value) {
        // Special case, where no index is given, but only the value.
        if ('undefined' === typeof value) {
            value = index;
            index = this.list.length;
        }

        return this.set(index, value);
    };

    this.remove = function (index, value) {
        // Special case, where no index is given, but only the value.
        if ('undefined' === typeof value) {
            value = index;
            index = this.list.indexOf(value, 0);
        }

        // Discard the value.
        this.list.splice(index, 1);

        return this;
    };

    this.get = function (index) {
        return this.has(index)
            ? this.list[index]
            : null;
    };

    this.set = function (index, value) {
        this.list[index] = value;

        return this;
    };

    this.has = function (index) {
        return 'undefined' !== typeof this.list[index];
    };

    this.each = function (callback) {
        for (let i = 0, j = this.list.length; i < j; i++) {
            callback(this.list[i], i);
        }

        return this;
    };

    this.push = function (value) {
        this.list[this.list.length] = value;

        return this;
    };

    this.pop = function () {
        const index = this.list.length - 1;
        if (0 > index) {
            return null;
        }

        const value = this.list[index];

        this.list.length = index;

        return value;
    };

    this.size = function () {
        return this.list.length;
    };

    this.clear = function () {
        this.list.length = 0;

        return this;
    };

    return Merge(this, self);
}

export function CollectionMap(list) {
    const self = {};

    this.list = !!list
        ? list
        : {};

    this.add = function (key, value) {
        return this.set(key, value);
    };

    this.remove = function (key) {
        if (this.list.hasOwnProperty(key)) {
            delete this.list[key];
        }

        return this;
    };

    this.get = function (key) {
        return this.has(key)
            ? this.list[key]
            : null;
    };

    this.set = function (key, value) {
        this.list[key] = value;

        return this;
    };

    this.has = function (key, strict) {
        // Special case, where strict is not set, but it should be true.
        if ('undefined' === typeof strict) {
            strict = true;
        }

        return strict
            ? this.list.hasOwnProperty(key)
            : key in this.list;
    };

    this.each = function (callback) {
        for (let k in this.list) {
            if (!this.list.hasOwnProperty(k)) {
                continue;
            }

            callback(this.list[k], k);
        }

        return this;
    };

    this.clear = function () {
        for (let k in this.list) {
            if (!this.list.hasOwnProperty(k)) {
                continue;
            }

            delete this.list[k];
        }

        return this;
    };

    return Merge(this, self);
}
