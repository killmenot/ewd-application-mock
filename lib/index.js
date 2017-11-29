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

      return {
        text: 'This is message is from bar worker response handler'
      };
    },

    baz: function (message, send) {
      debug('message: %s', JSON.stringify(message));

      if (send) {
        send({
          type: message.type,
          finished: true,
          message: {
            text: 'This is message was handled by baz worker response handler'
          }
        });
      }

      return true;
    }
  }
};
