type data = {
  analyticType: string,
  users: option(list(Leaderboard.item)),
  createdAt: string,
  updatedAt: string
};

type response = {data: option(data)};

module Decode = {
  let data = json =>
    Json.Decode.{
      analyticType: json |> field("type", string),
      users: json |> optional(field("users", list(Leaderboard.Decode.item))),
      createdAt: json |> field("createdAt", string),
      updatedAt: json |> field("updatedAt", string)
    };
  let response = json =>
    Json.Decode.{data: json |> optional(field("data", data))};
};

let str = ReasonReact.string;

type state =
  | Loading
  | Error
  | Success(response);

type action =
  | Fetch
  | FetchSuccess(response)
  | FetchError;

let component = ReasonReact.reducerComponent("LeaderboardMostRepos");

let make = (~heading, ~baseUrl, _children) => {
  ...component,
  didMount: self => self.send(Fetch),
  initialState: () => Loading,
  reducer: (action, _state) =>
    switch action {
    | Fetch =>
      ReasonReact.UpdateWithSideEffects(
        Loading,
        (
          self =>
            Js.Promise.(
              Fetch.fetch(baseUrl)
              |> then_(Fetch.Response.json)
              |> then_(json =>
                   json
                   |> Decode.response
                   |> (response => self.send(FetchSuccess(response)))
                   |> resolve
                 )
              |> catch(err =>
                   err |> Js.log |> ((_) => self.send(FetchError)) |> resolve
                 )
              |> ignore
            )
        )
      )
    | FetchSuccess(response) => ReasonReact.Update(Success(response))
    | FetchError => ReasonReact.Update(Error)
    },
  render: self =>
    switch self.state {
    | Loading => <Loader />
    | Error => <Error />
    | Success(response) =>
      switch response.data {
      | Some(data) =>
        switch data.users {
        | Some(users) => <Leaderboard heading repos=users />
        | None => ReasonReact.null
        }
      | None => ReasonReact.null
      }
    }
};