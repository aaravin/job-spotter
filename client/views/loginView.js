
var Login = React.createClass({

  getInitialState: function() {
    return {
      link: 'https://www.linkedin.com/uas/oauth2/authorization/authorization?response_type=',
      code: 'code&',
      id: 'client_id=' + '75pyoreru563v1&',
      redirect_uri: 'redirect_uri=' + 'https://localhost:8080/auth/linkedin/callback',
      requestState: '23kk43599sfffdsa09dsfd894',
      authLink: link + code + id + redirect_uri + '%2Fauth%2Flinkedin&' + 'state=' + requestState
    }
  },

  sendRequest: function(code, requestState) {
    var requestObj = {
      link: 'https://www.linkedin.com/uas/oauth2/accessToken',
      grantType: 'authorization_code',
      code: code + '&',
      redirectURI: ,
      id: this.state.id,
      _key; '',
      authLink: ''
    };
    $.post(requestObj.authLink, function(response) {
      if(response.state === this.state.requestState) {
        this.sendRequest(response.code, response.state);
      } else {
        // send 401 - CSRF
      }
    }.bind(this));

  },

  handleSubmit: function() {
    $.get(this.state.authLink, function(response) {
      if(response.state === this.state.requestState) {
        this.sendRequest(response.code, response.state);
      } else {
        // send 401 - CSRF
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <button onClick={this.handleSubmit}>Login with LinkedIn</button>
      </div>
    );
  }

});

