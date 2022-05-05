const { handleTicketOpen, handleTicketClose } = require("@src/handlers/ticket");
const { handleApproveBtn, handleRejectBtn, handleDeleteBtn } = require("@src/handlers/suggestion");
const { commandHandler, contextHandler } = require("@src/handlers");

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Interaction} interaction
 */
module.exports = async (client, interaction) => {
  if (!interaction.guild) {
    return interaction
      .reply({ content: "Command can only be executed in a discord server", ephemeral: true })
      .catch(() => {});
  }

  // Slash Command
  if (interaction.isCommand()) {
    return commandHandler.handleSlashCommand(interaction);
  }

  // Context Menu
  else if (interaction.isContextMenu()) {
    const context = client.contextMenus.get(interaction.commandName);
    if (context) await contextHandler.handleContext(interaction, context);
    else return interaction.reply({ content: "An error has occurred", ephemeral: true }).catch(() => {});
  }

  // Custom Buttons
  else if (interaction.isButton()) {
    // ticket create
    if (interaction.customId === "TICKET_CREATE") {
      await interaction.deferReply({ ephemeral: true });
      await handleTicketOpen(interaction);
    }

    // ticket close
    if (interaction.customId === "TICKET_CLOSE") {
      await interaction.deferReply({ ephemeral: true });
      await handleTicketClose(interaction);
    }

    // Suggestion
    if (interaction.customId === "SUGGEST_APPROVE") {
      await interaction.deferReply({ ephemeral: true });
      await handleApproveBtn(interaction);
    }

    if (interaction.customId === "SUGGEST_REJECT") {
      await interaction.deferReply({ ephemeral: true });
      await handleRejectBtn(interaction);
    }

    if (interaction.customId === "SUGGEST_DELETE") {
      await interaction.deferReply({ ephemeral: true });
      await handleDeleteBtn(interaction);
    }
  }
};
