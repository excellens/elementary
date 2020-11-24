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

/**
 * Visit each property of an object.
 *
 * @param {Object}      object
 * @param {function}    callback
 * @param {boolean}     hierarchy
 */
export function Visit(object, callback, hierarchy) {
    for (const property in object) {
        if (!hierarchy && !object.hasOwnProperty(property)) {
            continue;
        }
        callback(property, object[property]);
    }
}

/**
 * Merge self-context into an object and bind any function to the object.
 *
 * @param {Object}      self
 * @param {Object}      object
 */
export function Merge(self, object) {
    Visit(self, function (property, propertyValue) {
        if (typeof propertyValue === 'function') {
            object[property] = propertyValue.bind(object);
        } else {
            object[property] = propertyValue;
        }
    }, true);
    return object;
}
