<template>
    <div>
        <strong>Default Size:</strong>
        <br />
        <br />
        <List header="Header" footer="Footer" border>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
        </List>
        <br />
        <strong>Small Size:</strong>
        <br />
        <br />
        <List header="Header" footer="Footer" border size="small">
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
        </List>
        <br />
        <strong>Large Size:</strong>
        <br />
        <br />
        <List header="Header" footer="Footer" border size="large">
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
        </List>
    </div>
    <div>
        <List>
            <ListItem>
                <ListItemMeta
                    avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                    title="This is title"
                    description="This is description, this is description."
                />
            </ListItem>
            <ListItem>
                <ListItemMeta
                    avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                    title="This is title"
                    description="This is description, this is description."
                />
            </ListItem>
            <ListItem>
                <ListItemMeta
                    avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                    title="This is title"
                    description="This is description, this is description."
                />
                <template v-slot:action>
                    <li>
                        <a href>Edit</a>
                    </li>
                    <li>
                        <a href>More</a>
                    </li>
                </template>
            </ListItem>
            <ListItem>
                <ListItemMeta
                    avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                    title="This is title"
                    description="This is description, this is description."
                />
                <template v-slot:action>
                    <li>
                        <a href>Edit</a>
                    </li>
                    <li>
                        <a href>More</a>
                    </li>
                </template>
            </ListItem>
        </List>
    </div>
    <div>
        <List item-layout="vertical">
            <ListItem v-for="item in data" :key="item.title">
                <ListItemMeta
                    :avatar="item.avatar"
                    :title="item.title"
                    :description="item.description"
                />
                {{ item.content }}
                <template slot="action">
                    <li>
                        <Icon type="ios-star-outline" />123
                    </li>
                    <li>
                        <Icon type="ios-thumbs-up-outline" />234
                    </li>
                    <li>
                        <Icon type="ios-chatbubbles-outline" />345
                    </li>
                </template>
                <template v-slot:extra>
                    <img
                        src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                        style="width: 280px"
                    />
                </template>
            </ListItem>
        </List>
    </div>
</template>
<script setup lang="ts">
import List from '../src/components/list';
import ListItem from '../src/components/list-item';
import ListItemMeta from '../src/components/list-item-meta';
import Icon from '../src/components/icon';

const data = [
    {
        title: 'This is title 1',
        description: 'This is description, this is description, this is description.',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        content: 'This is the content, this is the content, this is the content, this is the content.'
    },
    {
        title: 'This is title 2',
        description: 'This is description, this is description, this is description.',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        content: 'This is the content, this is the content, this is the content, this is the content.'
    },
    {
        title: 'This is title 3',
        description: 'This is description, this is description, this is description.',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        content: 'This is the content, this is the content, this is the content, this is the content.'
    }
]
</script>