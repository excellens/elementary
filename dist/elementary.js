/*! @excellens/elementary 1.0.0 https://github.com/Excellens/elementary#readme @license MIT */
var Elementary = function(exports) {
  "use strict";
  /**
     * Visit each property of an object.
     *
     * @param {Object}      object
     * @param {function}    callback
     * @param {boolean}     hierarchy
     */  function Visit(object, callback, hierarchy) {
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
     */  function Merge(self, object) {
    Visit(self, (function(property, propertyValue) {
      if (typeof propertyValue === "function") {
        object[property] = propertyValue.bind(object);
      } else {
        object[property] = propertyValue;
      }
    }), true);
    return object;
  }
  var Base =  Object.freeze({
    __proto__: null,
    Visit: Visit,
    Merge: Merge
  });
  function Collection(list) {
    const self = {};
    this.list = !!list ? list : [];
    this.add = function(index, value) {
      // Special case, where no index is given, but only the value.
      if ("undefined" === typeof value) {
        value = index;
        index = this.list.length;
      }
      return this.set(index, value);
    };
    this.remove = function(index, value) {
      // Special case, where no index is given, but only the value.
      if ("undefined" === typeof value) {
        value = index;
        index = this.list.indexOf(value, 0);
      }
      // Discard the value.
            this.list.splice(index, 1);
      return this;
    };
    this.get = function(index) {
      return this.has(index) ? this.list[index] : null;
    };
    this.set = function(index, value) {
      this.list[index] = value;
      return this;
    };
    this.has = function(index) {
      return "undefined" !== typeof this.list[index];
    };
    this.each = function(callback) {
      for (let i = 0, j = this.list.length; i < j; i++) {
        callback(this.list[i], i);
      }
      return this;
    };
    this.push = function(value) {
      this.list[this.list.length] = value;
      return this;
    };
    this.pop = function() {
      const index = this.list.length - 1;
      if (0 > index) {
        return null;
      }
      const value = this.list[index];
      this.list.length = index;
      return value;
    };
    this.size = function() {
      return this.list.length;
    };
    this.clear = function() {
      this.list.length = 0;
      return this;
    };
    return Merge(this, self);
  }
  function CollectionMap(list) {
    const self = {};
    this.list = !!list ? list : {};
    this.add = function(key, value) {
      return this.set(key, value);
    };
    this.remove = function(key) {
      if (this.list.hasOwnProperty(key)) {
        delete this.list[key];
      }
      return this;
    };
    this.get = function(key) {
      return this.has(key) ? this.list[key] : null;
    };
    this.set = function(key, value) {
      this.list[key] = value;
      return this;
    };
    this.has = function(key, strict) {
      // Special case, where strict is not set, but it should be true.
      if ("undefined" === typeof strict) {
        strict = true;
      }
      return strict ? this.list.hasOwnProperty(key) : key in this.list;
    };
    this.each = function(callback) {
      for (let k in this.list) {
        if (!this.list.hasOwnProperty(k)) {
          continue;
        }
        callback(this.list[k], k);
      }
      return this;
    };
    this.clear = function() {
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
  var Collection$1 =  Object.freeze({
    __proto__: null,
    Collection: Collection,
    CollectionMap: CollectionMap
  });
  function Callback(id, callback) {
    const self = {};
    this.id = !!id ? id : null;
    this.callback = callback;
    this.getId = function() {
      return this.id;
    };
    this.setId = function(id) {
      this.id = id;
      return this;
    };
    this.hasId = function() {
      return null !== this.id;
    };
    this.update = function(subject) {
      this.callback(subject, this.id);
      return this;
    };
    return Merge(this, self);
  }
  function Subject() {
    const self = {};
    this.callbackCollection = new Collection;
    this.attachCallback = function(callback) {
      this.callbackCollection.add(callback);
      return this;
    };
    this.detachCallback = function(callback) {
      this.callbackCollection.remove(callback);
      return this;
    };
    this.notify = function() {
      const subject = this;
      this.callbackCollection.each((function(value, index) {
        value.update(subject);
      }));
      return this;
    };
    return Merge(this, self);
  }
  var Observe =  Object.freeze({
    __proto__: null,
    Callback: Callback,
    Subject: Subject
  });
  /**
     * Assert the element tag-name is equal to the element-name.
     *
     * @param {Object}  element
     * @param {string}  elementName
     * @returns {boolean}
     */  function assertType(element, elementName) {
    if (element.tagName.toUpperCase() === elementName.toUpperCase()) {
      return true;
    }
    throw "ERR_ELEMENT_NAME";
  }
  function Element(document, elementName, element) {
    const self = function(document, elementName, element) {
      element = !!element ? element : document.createElement(elementName);
      assertType(element, elementName);
      return element;
    }(document, elementName, element);
    return Merge(this, self);
  }
  var Element$1 =  Object.freeze({
    __proto__: null,
    Element: Element
  });
  function Component(presenter, document, elementName, element) {
    const self = new Element(document, elementName, element);
    this.presenter = presenter;
    this.initialize = function() {
      this.presenter.initialize(this);
      return this;
    };
    this.destroy = function() {
      this.presenter.destroy();
      return this;
    };
    return Merge(this, self);
  }
  function ComponentPresenter(state) {
    const self = {};
    this.state = state;
    this.update = function(state, id) {
      throw "ERR_COMPONENT_UPDATE";
    };
    let callback = null;
    this.component = null;
    this.initialize = function(component) {
      this.component = component;
      callback = new Callback("ComponentPresenter", this.update);
      this.state.attachCallback(callback);
      this.state.notify();
      return this;
    };
    this.destroy = function() {
      this.component = null;
      this.state.detachCallback(callback);
      callback = null;
      return this;
    };
    return Merge(this, self);
  }
  function ComponentState() {
    const self = new Subject;
    return Merge(this, self);
  }
  var Component$1 =  Object.freeze({
    __proto__: null,
    Component: Component,
    ComponentPresenter: ComponentPresenter,
    ComponentState: ComponentState
  });
  var version = "1.0.0";
  const metadata = {
    version: version
  };
  exports.Base = Base;
  exports.Collection = Collection$1;
  exports.Component = Component$1;
  exports.Element = Element$1;
  exports.Observe = Observe;
  exports.metadata = metadata;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  return exports;
}({});
//# sourceMappingURL=elementary.js.map
