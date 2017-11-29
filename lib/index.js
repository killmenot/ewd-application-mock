'use strict';

var debug = require('debug')('ewd-application-mock');

module.exports = {
  init: function (application) {
    debug('init: %s', application);
  },

  beforeHandler: function (message, session, send, finished) {
    debug('beforeHandler message: %s', JSON.stringify(message));

    if (message.params && message.params.beforeHandler) {
      finished({
        type: message.type,
        text: 'Hello from beforeHandler!'
      });

      return false;
    }
  },

  afterHandler: function (message) {
    debug('afterHandler message: %s', JSON.stringify(message));
  },

  handlers: {
    foo: function (message, session, send, finished) {
      debug('message: %s', JSON.stringify(message));

      finished({
        type: message.type,
        text: 'This is message was handled by foo handler'
      });
    },

    bar: function (message, session, send, finished) {
      debug('message: %s', JSON.stringify(message));

      finished({
        type: message.type,
        ok: true
      });
    },

    baz: function (message, session, send, finished) {
      debug('message: %s', JSON.stringify(message));

      finished({
        type: message.type,
        ok: true
      });
    },
  },

  workerResponseHandlers: {
    bar: function (message) {
      debug('message: %s', JSON.stringify(message));
    },

    baz: function (message, send) {
      debug('message: %s', JSON.stringify(message));

      var responseObj = {
        type: message.type,
        text: 'This is message was handled by bar worker response handler'
      };

      if (send) {
        send(responseObj);

        return true;
      }

      return responseObj;
    }
  }
};
