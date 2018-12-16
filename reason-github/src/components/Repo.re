[%bs.raw {|require('./Repo.css')|}];

let str = ReasonReact.string;

type repo = {
  avatarUrl: option(string),
  createdAt: string,
  description: option(string),
  forks: int,
  homepageUrl: option(string),
  isFork: bool,
  languages: option(list(string)),
  login: string,
  name: string,
  nameWithOwner: string,
  stargazers: int,
  updatedAt: string,
  url: string,
  watchers: int
};

module Decode = {
  let repo = json =>
    Json.Decode.{
      avatarUrl: json |> optional(field("avatarUrl", string)),
      createdAt: json |> field("createdAt", string),
      description: json |> optional(field("description", string)),
      forks: json |> field("forks", int),
      homepageUrl: json |> optional(field("homepageUrl", string)),
      isFork: json |> field("isFork", bool),
      languages: json |> optional(field("languages", list(string))),
      login: json |> field("login", string),
      name: json |> field("name", string),
      nameWithOwner: json |> field("nameWithOwner", string),
      stargazers: json |> field("stargazers", int),
      updatedAt: json |> field("updatedAt", string),
      url: json |> field("url", string),
      watchers: json |> field("watchers", int)
    };
};

let component = ReasonReact.statelessComponent("RepoList");

let make = (~heading="", ~repos: list(repo), _children) => {
  ...component,
  render: _self =>
    <div className="leaderboard-last-updated-repos">
      <h2> (str(heading)) </h2>
      <div className="repo-holder">
        (
          repos
          |> List.map(
               (
                 {
                   updatedAt,
                   description,
                   languages,
                   nameWithOwner,
                   avatarUrl,
                   stargazers,
                   url,
                   forks
                 }
               ) =>
               <a key=url className="repo link" href=url target="_blank">
                 <div className="repo__image-holder">
                   (
                     switch avatarUrl {
                     | Some(src) => <img src width="30" height="auto" />
                     | None => <div className="placeholder" />
                     }
                   )
                 </div>
                 <div className="repo__info-holder">
                   <b> (str(nameWithOwner)) </b>
                   <p className="repo__description">
                     (
                       switch description {
                       | Some(description) => str(description)
                       | None => str("No description available")
                       }
                     )
                   </p>
                   <div className="repo__footer">
                     <div>
                       <i className="fa fa-star" />
                       (str(" "))
                       (str(string_of_int(stargazers)))
                     </div>
                     (
                       switch languages {
                       | Some(languages) =>
                         switch languages {
                         | [] => ReasonReact.null
                         | [language, ...rest] =>
                           <Language language=(Some(language)) />
                         }
                       | None => ReasonReact.null
                       }
                     )
                     (
                       switch forks {
                       | 0 => ReasonReact.null
                       | n =>
                         <div>
                           <i className="fa fa-code-fork" />
                           (str(" "))
                           (str(string_of_int(n)))
                         </div>
                       }
                     )
                     <div className="repo__footer-date">
                       (str(Date.parseDate(updatedAt)))
                     </div>
                   </div>
                 </div>
               </a>
             )
          |> Array.of_list
          |> ReasonReact.array
        )
      </div>
    </div>
};