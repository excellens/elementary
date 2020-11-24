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
import {Element} from "./Element";
import {Callback, Subject} from "./Observe";

export function Component(presenter, document, elementName, element) {
    const self = new Element(document, elementName, element);

    this.presenter = presenter;

    this.initialize = function () {
        this.presenter.initialize(this);

        return this;
    };

    this.destroy = function () {
        this.presenter.destroy();

        return this;
    };

    return Merge(this, self);
}

export function ComponentPresenter(state) {
    const self = {};

    this.state = state;

    this.update = function (state, id) {
        throw 'ERR_COMPONENT_UPDATE';
    };

    let callback = null;

    this.component = null;

    this.initialize = function (component) {
        this.component = component;

        callback = new Callback('ComponentPresenter', this.update);
        this.state.attachCallback(callback);
        this.state.notify();

        return this;
    };

    this.destroy = function () {
        this.component = null;

        this.state.detachCallback(callback);
        callback = null;

        return this;
    };

    return Merge(this, self);
}

export function ComponentState() {
    const self = new Subject();

    return Merge(this, self);
}
