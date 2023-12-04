# DuelHub-API
Une api de jeu de combat

## Goal
create an api to manage and share data about the FGC
(user,games,news)


## Technologies

Database: MySQL

API: Express

ORM: Sequelize

HTML5,CSS,TailWind,javascript

## Features

User interaction:
> friend list
>
> game:
> > character
> >
> > join room
>
> event participation:
> > event info
> > 
> > participation
>
> messaging:
>
> > group convo
> >
> > private convo
> >
> > game forum / news

Games:
> game info
>
> tournaments:
> > date
> >
> > type
> >
> > location
> >
> > additional info
>
> game wiki
>
> game guides

## Database setup

### HUB Database

User table

    User (
        uuid,
        email,
        basename,
        username,
        password,
        rank
    )

Relation table

    Relation (
        uuid_user,
        uuid_friend,
        type
    )

Game table

    Game (
        uuid,
        title,
        series,
        studio,
    )

Wiki table

    Wiki (
        uuid_game,
        hosting,
        creation_date,
        url
    )

Rank table

    Rank (
        uuid_rank,
        title,
        desc,
        power
    )

Permissions table

    permissions_allowed (
        uuid_permissions,
        uuid_rank
    )

    permissions (
        uuid_permissions,
        title,
        command
    )


### Conversation Database

Room table

    Room (
        uuid,
        type,
        title,
        desc,
        uuid_category
    )

Category table

    Category (
        uuid,
        title,
        desc
    )

Tag table

    Tag (
        uuid,
        target,
        name
    )

### Wiki Database

Articles table

    Articles (
        uuid,
        title,
        desc,
        content,
        icon,
        uuid_author,
        published,
        visibility
    )

Comments table

    Comments (
        uuid,
        uuid_author,
        content,
        published,
        modified
    )

Editor table

    Editor (
        uuid_user,
        uuid_post,
        numEdit,
        pushRequest
    )

